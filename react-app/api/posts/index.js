// GET  /api/posts          → published posts (list projection)
// GET  /api/posts?all=1    → all posts incl. drafts (admin)
// POST /api/posts          → create post (admin)

import { db, POSTS } from '../_lib/firestore.js';
import { send, fail, requireAdmin, getBody, slugify, readingTimeMinutes } from '../_lib/util.js';

function listProjection(doc) {
  const d = doc.data();
  return {
    id: doc.id,
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt || '',
    coverImage: d.coverImage || '',
    tags: d.tags || [],
    status: d.status,
    readingTime: d.readingTime || 1,
    publishedAt: d.publishedAt || null,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const wantAll = req.query?.all === '1';
      if (wantAll && !requireAdmin(req, res)) return;

      const snap = await db().collection(POSTS).get();
      let posts = snap.docs.map(listProjection);
      if (!wantAll) posts = posts.filter((p) => p.status === 'published');
      posts.sort((a, b) =>
        String(b.publishedAt || b.createdAt || '').localeCompare(String(a.publishedAt || a.createdAt || '')),
      );
      res.setHeader('Cache-Control', wantAll ? 'no-store' : 's-maxage=60, stale-while-revalidate=300');
      return send(res, 200, { ok: true, posts });
    }

    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) return;
      const body = getBody(req);
      const title = String(body.title || '').trim();
      if (!title) return fail(res, 400, 'Title is required.');

      const now = new Date().toISOString();
      let slug = slugify(body.slug || title);

      // Ensure slug uniqueness.
      const clash = await db().collection(POSTS).where('slug', '==', slug).limit(1).get();
      if (!clash.empty) slug = `${slug}-${Date.now().toString(36)}`;

      const status = body.status === 'published' ? 'published' : 'draft';
      const post = {
        title,
        slug,
        excerpt: String(body.excerpt || '').trim(),
        coverImage: String(body.coverImage || ''),
        tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 8) : [],
        contentJson: typeof body.contentJson === 'string' ? body.contentJson : JSON.stringify(body.contentJson || null),
        contentHtml: String(body.contentHtml || ''),
        status,
        readingTime: readingTimeMinutes(body.contentHtml),
        createdAt: now,
        updatedAt: now,
        publishedAt: status === 'published' ? now : null,
      };

      const ref = await db().collection(POSTS).add(post);
      return send(res, 201, { ok: true, id: ref.id, slug });
    }

    return fail(res, 405, 'Method not allowed.');
  } catch (err) {
    console.error('posts/index error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
