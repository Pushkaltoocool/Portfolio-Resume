import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar.jsx';
import Footer from '../../sections/Footer.jsx';
import { api, formatDate } from '../../lib/api.js';

const EntryRow = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="log-row group">
    <div className="log-row-date">{formatDate(post.publishedAt || post.createdAt)}</div>

    <div className="min-w-0">
      <h3 className="text-xl sm:text-2xl font-semibold text-white-700 group-hover:text-white transition-colors text-balance">
        {post.title}
      </h3>
      {post.excerpt && <p className="mt-2 text-white-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-white-500">
        <span>{post.readingTime} min read</span>
        {post.tags?.map((tag) => (
          <span key={tag} className="text-blue-300/70">
            #{tag}
          </span>
        ))}
      </div>
    </div>

    <div className="hidden md:flex items-center gap-5 shrink-0">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          className="w-36 h-[88px] object-cover rounded-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity"
        />
      )}
      <span className="text-white-500 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden>
        →
      </span>
    </div>
  </Link>
);

const FeaturedEntry = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="group block mt-14" data-aos="fade-up">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center rounded-2xl border border-white/10 bg-black-200/60 p-6 sm:p-10 transition-colors hover:border-blue-400/30">
      <div className="order-2 lg:order-1">
        <p className="font-mono text-xs text-blue-300/80">
          latest entry · {formatDate(post.publishedAt || post.createdAt)}
        </p>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight text-balance group-hover:text-blue-100 transition-colors">
          {post.title}
        </h2>
        {post.excerpt && <p className="mt-4 text-lg text-white-600 leading-relaxed line-clamp-3">{post.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-white-500">
          <span>{post.readingTime} min read</span>
          {post.tags?.map((tag) => (
            <span key={tag} className="text-blue-300/70">
              #{tag}
            </span>
          ))}
        </div>
        <p className="mt-8 inline-flex items-center gap-2 text-white font-medium">
          Read entry
          <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
            →
          </span>
        </p>
      </div>
      {post.coverImage && (
        <div className="order-1 lg:order-2 overflow-hidden rounded-xl border border-white/10">
          <img
            src={post.coverImage}
            alt=""
            className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}
    </div>
  </Link>
);

const BlogIndex = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [activeTag, setActiveTag] = useState('');

  useEffect(() => {
    document.title = 'Dev Log — Pushkal Vashist';
    api('/api/posts')
      .then((d) => setPosts(d.posts))
      .catch((e) => setError(e.message));
  }, []);

  const tags = useMemo(() => {
    const all = new Set();
    (posts || []).forEach((p) => (p.tags || []).forEach((t) => all.add(t)));
    return [...all].sort();
  }, [posts]);

  const visible = useMemo(() => {
    if (!posts) return [];
    return activeTag ? posts.filter((p) => p.tags?.includes(activeTag)) : posts;
  }, [posts, activeTag]);

  const [featured, ...rest] = activeTag ? [null, ...visible] : visible;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto relative c-space pt-32 pb-20 min-h-screen">
        <header data-aos="fade-up">
          <p className="font-mono text-sm text-blue-300/80">~/pushkal/dev-log</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-black text-white tracking-tight text-balance">The Dev Log</h1>
          <p className="mt-4 max-w-xl text-lg text-white-600 leading-relaxed">
            Build notes, competition postmortems, and things I learned the hard way — written as I go.
          </p>
        </header>

        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2" data-aos="fade-up">
            <button
              onClick={() => setActiveTag('')}
              className={`tag-pill ${activeTag === '' ? 'tag-pill-active' : ''}`}>
              all
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
                className={`tag-pill ${activeTag === tag ? 'tag-pill-active' : ''}`}>
                #{tag}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-16 terminal-note" role="alert">
            <p className="text-red-400">$ error: {error}</p>
          </div>
        )}

        {!posts && !error && (
          <div className="mt-14 space-y-6" aria-hidden>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-black-200/70 animate-pulse" />
            ))}
          </div>
        )}

        {posts && visible.length === 0 && !error && (
          <div className="mt-16 terminal-note">
            <p className="text-white-500">
              $ ls entries{activeTag ? ` --tag ${activeTag}` : ''}
              <br />
              <span className="text-white-600">nothing here yet — first entry coming soon.</span>
            </p>
          </div>
        )}

        {featured && <FeaturedEntry post={featured} />}

        {rest.length > 0 && (
          <div className="mt-14 border-t border-white/10">
            {rest.map((post) => (
              <EntryRow key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <div className="max-w-7xl mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
