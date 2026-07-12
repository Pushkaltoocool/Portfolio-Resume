import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar.jsx';
import AdminGate from './AdminGate.jsx';
import RichTextEditor from '../../components/editor/RichTextEditor.jsx';
import { uploadImage } from '../../lib/upload.js';
import { api } from '../../lib/api.js';

const emptyDraft = {
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  tags: [],
  contentHtml: '',
  contentJson: null,
  status: 'draft',
};

const slugPreview = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

const EditorInner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [draft, setDraft] = useState(emptyDraft);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const [coverBusy, setCoverBusy] = useState(false);
  const [initialContent, setInitialContent] = useState('');
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    document.title = isEdit ? 'Edit entry — Dev Log' : 'New entry — Dev Log';
    if (!isEdit) return;
    api(`/api/posts/${id}?by=id`, { admin: true })
      .then((d) => {
        setDraft({
          title: d.post.title || '',
          slug: d.post.slug || '',
          excerpt: d.post.excerpt || '',
          coverImage: d.post.coverImage || '',
          tags: d.post.tags || [],
          contentHtml: d.post.contentHtml || '',
          contentJson: d.post.contentJson || null,
          status: d.post.status || 'draft',
        });
        setInitialContent(d.post.contentHtml || '');
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id, isEdit]);

  const update = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const effectiveSlug = useMemo(
    () => (slugTouched ? slugPreview(draft.slug) : slugPreview(draft.title)),
    [draft.slug, draft.title, slugTouched],
  );

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '');
    if (t && !draft.tags.includes(t) && draft.tags.length < 8) update({ tags: [...draft.tags, t] });
    setTagInput('');
  };

  const uploadCover = async (file) => {
    if (!file) return;
    setCoverBusy(true);
    setError('');
    try {
      update({ coverImage: await uploadImage(file) });
    } catch (e) {
      setError(e.message);
    } finally {
      setCoverBusy(false);
    }
  };

  const persist = async (status) => {
    if (!draft.title.trim()) {
      setError('Give your entry a title first.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaving(status);
    setError('');
    const payload = { ...draft, slug: effectiveSlug, status };
    try {
      if (isEdit) {
        await api(`/api/posts/${id}`, { method: 'PUT', admin: true, body: payload });
      } else {
        await api('/api/posts', { method: 'POST', admin: true, body: payload });
      }
      navigate('/blog/admin');
    } catch (e) {
      setError(e.message);
      setSaving('');
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto c-space pt-32">
        <div className="h-96 rounded-2xl bg-black-200 animate-pulse" />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto relative c-space pt-28 pb-24 min-h-screen">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link to="/blog/admin" className="font-mono text-sm text-white-500 hover:text-white transition-colors">
          ← entries
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white-500">
            {imageBusy || coverBusy ? 'uploading image…' : `slug: /blog/${effectiveSlug || '…'}`}
          </span>
          <button
            onClick={() => persist('draft')}
            disabled={Boolean(saving)}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white-700 hover:text-white hover:border-white/30 transition-colors disabled:opacity-40">
            {saving === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button
            onClick={() => persist('published')}
            disabled={Boolean(saving)}
            className="rounded-lg bg-white text-black font-semibold px-5 py-2 hover:bg-white-800 transition-colors disabled:opacity-40">
            {saving === 'published' ? 'Publishing…' : draft.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300" role="alert">
          {error}
        </p>
      )}

      <input
        value={draft.title}
        onChange={(e) => update({ title: e.target.value })}
        placeholder="Entry title"
        className="mt-8 w-full bg-transparent text-4xl sm:text-5xl font-black text-white placeholder:text-white-500/40 focus:outline-none tracking-tight"
      />

      {/* Cover image */}
      <div className="mt-8">
        {draft.coverImage ? (
          <div className="relative group rounded-2xl overflow-hidden border border-white/10">
            <img src={draft.coverImage} alt="cover" className="w-full max-h-72 object-cover" />
            <button
              onClick={() => update({ coverImage: '' })}
              className="absolute top-3 right-3 rounded-lg bg-black/70 px-3 py-1.5 text-sm text-white hover:bg-black transition-colors">
              Remove cover
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-8 cursor-pointer text-white-500 hover:text-white hover:border-white/30 transition-colors">
            <i className="fa-solid fa-image" />
            {coverBusy ? 'Uploading cover…' : 'Add a cover image'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadCover(e.target.files?.[0])} />
          </label>
        )}
      </div>

      {/* Meta fields */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="excerpt" className="block text-sm text-white-600 mb-2">
            Excerpt <span className="text-white-500">(shown in the list)</span>
          </label>
          <textarea
            id="excerpt"
            value={draft.excerpt}
            onChange={(e) => update({ excerpt: e.target.value })}
            rows={3}
            placeholder="A one or two line summary."
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white-800 focus:outline-none focus:border-blue-400/50 resize-none"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm text-white-600 mb-2">
            Custom slug <span className="text-white-500">(optional)</span>
          </label>
          <input
            id="slug"
            value={draft.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update({ slug: e.target.value });
            }}
            placeholder={slugPreview(draft.title) || 'auto-from-title'}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white-800 font-mono text-sm focus:outline-none focus:border-blue-400/50"
          />
          <label className="block text-sm text-white-600 mt-4 mb-2">Tags</label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-2">
            {draft.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 rounded bg-blue-500/15 text-blue-200 px-2 py-1 text-xs">
                #{tag}
                <button onClick={() => update({ tags: draft.tags.filter((t) => t !== tag) })} aria-label={`Remove ${tag}`}>
                  ×
                </button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  addTag();
                }
              }}
              onBlur={addTag}
              placeholder={draft.tags.length ? '' : 'add tags…'}
              className="flex-1 min-w-24 bg-transparent text-sm text-white focus:outline-none py-1"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8">
        <RichTextEditor value={initialContent} onChange={({ html, json }) => update({ contentHtml: html, contentJson: json })} onImageBusy={setImageBusy} />
      </div>
    </main>
  );
};

const BlogEditor = () => (
  <AdminGate>
    <Navbar />
    <EditorInner />
  </AdminGate>
);

export default BlogEditor;
