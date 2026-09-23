import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Not found · Pushkal Vashist';

    // Vercel's SPA rewrite serves index.html with a 200 for every path, so this
    // page cannot return a real HTTP 404. Keeping it out of the index is the
    // only lever available from the client.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <Layout>
      <div className="terminal-note max-w-xl" role="alert">
        <p className="text-red-400">$ cd {pathname}</p>
        <p className="text-white-600 mt-2">no such page.</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white-500">
          <Link to="/" className="hover:text-white transition-colors">
            → home
          </Link>
          <Link to="/projects" className="hover:text-white transition-colors">
            → projects
          </Link>
          <Link to="/blog" className="hover:text-white transition-colors">
            → dev log
          </Link>
          <Link to="/book" className="hover:text-white transition-colors">
            → book a call
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
