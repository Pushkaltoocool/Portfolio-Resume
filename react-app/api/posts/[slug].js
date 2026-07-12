// GET    /api/posts/:slug        → single published post (admin also sees drafts)
// GET    /api/posts/:id?by=id    → single post by document id (admin)
// PUT    /api/posts/:id          → update post by id (admin)
// DELETE /api/posts/:id          → delete post by id (admin)

import { db, POSTS } from '../_lib/firestore.js';
import { send, fail, isAdmin, requireAdmin, getBody, slugify, readingTimeMinutes } from '../_lib/util.js';

function fullPost(doc) {
  return { id: doc.id, ...doc.data() };
}

export default async function handler(req, res) {
  const param = String(req.query?.slug || '');
  if (!param) return fail(res, 400, 'Missing post identifier.');

  try {
    const col = db().collection(POSTS);

    if (req.method === 'GET') {
      let doc = null;
      if (req.query?.by === 'id') {
        if (!requireAdmin(req, res)) return;
        doc = await col.doc(param).get();
        if (!doc.exists) return fail(res, 404, 'Post not found.');
      } else {
        const snap = await col.where('slug', '==', param).limit(1).get();
        if (snap.empty) return fail(res, 404, 'Post not found.');
        doc = snap.docs[0];
        if (doc.data().status !== 'published' && !isAdmin(req)) {
          return fail(res, 404, 'Post not found.');
        }
      }
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return send(res, 200, { ok: true, post: fullPost(doc) });
    }

    if (req.method === 'PUT') {
      if (!requireAdmin(req, res)) return;
      const ref = col.doc(param);
      const existing = await ref.get();
      if (!existing.exists) return fail(res, 404, 'Post not found.');

      const body = getBody(req);
      const prev = existing.data();
      const now = new Date().toISOString();
      const status = body.status === 'published' ? 'published' : 'draft';

      let slug = prev.slug;
      if (body.slug && slugify(body.slug) !== prev.slug) {
        slug = slugify(body.slug);
        const clash = await col.where('slug', '==', slug).limit(1).get();
        if (!clash.empty && clash.docs[0].id !== param) slug = `${slug}-${Date.now().toString(36)}`;
      }

      const update = {
        title: String(body.title || prev.title).trim(),
        slug,
        excerpt: String(body.excerpt ?? prev.excerpt ?? '').trim(),
        coverImage: String(body.coverImage ?? prev.coverImage ?? ''),
        tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 8) : prev.tags,
        contentJson: typeof body.contentJson === 'string' ? body.contentJson : JSON.stringify(body.contentJson || null),
        contentHtml: String(body.contentHtml ?? prev.contentHtml ?? ''),
        status,
        readingTime: readingTimeMinutes(body.contentHtml ?? prev.contentHtml),
        updatedAt: now,
        publishedAt: status === 'published' ? prev.publishedAt || now : prev.publishedAt || null,
      };

      await ref.update(update);
      return send(res, 200, { ok: true, id: param, slug });
    }

    if (req.method === 'DELETE') {
      if (!requireAdmin(req, res)) return;
      await col.doc(param).delete();
      return send(res, 200, { ok: true });
    }

    return fail(res, 405, 'Method not allowed.');
  } catch (err) {
    console.error('posts/[slug] error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
