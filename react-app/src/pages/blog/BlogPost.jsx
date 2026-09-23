import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import Navbar from '../../sections/Navbar.jsx';
import Footer from '../../sections/Footer.jsx';
import { api, formatDate } from '../../lib/api.js';

// Wrap each <pre> in a shell with a language label + copy button, then highlight.
function enhanceCodeBlocks(root) {
  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('code-shell')) return;
    const code = pre.querySelector('code');
    if (!code) return;

    const lang = [...code.classList].find((c) => c.startsWith('language-'))?.replace('language-', '') || 'code';

    const shell = document.createElement('div');
    shell.className = 'code-shell';
    const bar = document.createElement('div');
    bar.className = 'code-shell-bar';

    const label = document.createElement('span');
    label.textContent = lang;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        button.textContent = 'copied ✓';
        setTimeout(() => (button.textContent = 'copy'), 1500);
      } catch {
        button.textContent = 'failed';
      }
    });

    bar.append(label, button);
    pre.replaceWith(shell);
    shell.append(bar, pre);

    hljs.highlightElement(code);
  });
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setPost(null);
    setError('');
    api(`/api/posts/${encodeURIComponent(slug)}`)
      .then((d) => {
        setPost(d.post);
        document.title = `${d.post.title} — Pushkal Vashist`;
      })
      .catch((e) => setError(e.status === 404 ? 'This entry does not exist (or is not published yet).' : e.message));
  }, [slug]);

  useEffect(() => {
    if (post && contentRef.current) enhanceCodeBlocks(contentRef.current);
  }, [post]);

  const sharePost = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto relative c-space pt-32 pb-20 min-h-screen">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="font-mono text-sm text-white-500 hover:text-white transition-colors">
            ← ~/pushkal/dev-log
          </Link>

          {error && (
            <div className="mt-12 terminal-note" role="alert">
              <p className="text-red-400">$ {error}</p>
              <Link to="/blog" className="mt-3 inline-block text-blue-300 hover:text-blue-200">
                Back to the log →
              </Link>
            </div>
          )}

          {!post && !error && (
            <div className="mt-12 space-y-5" aria-hidden>
              <div className="h-10 w-3/4 rounded-lg bg-black-200 animate-pulse" />
              <div className="h-64 rounded-2xl bg-black-200 animate-pulse" />
              <div className="h-4 rounded bg-black-200 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-black-200 animate-pulse" />
            </div>
          )}

          {post && (
            <>
              <header className="mt-8">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight text-balance">
                  {post.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-white-500">
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime} min read</span>
                  {post.tags?.length > 0 && <span aria-hidden>·</span>}
                  {post.tags?.map((tag) => (
                    <span key={tag} className="text-blue-300/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  className="mt-10 w-full max-h-[440px] object-cover rounded-2xl border border-white/10"
                />
              )}

              <div
                ref={contentRef}
                className="blog-prose mt-12"
                // Content is authored only by the site owner in the admin editor.
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              <footer className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button onClick={sharePost} className="font-mono text-sm text-white-500 hover:text-white transition-colors">
                  {copied ? 'link copied ✓' : 'copy link'}
                </button>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-5 py-2.5 text-blue-100 hover:bg-blue-500/20 transition-colors">
                  Want to talk about this? Book the GOAT 🥶 →
                </Link>
              </footer>
            </>
          )}
        </article>
      </main>
      <div className="max-w-7xl mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
