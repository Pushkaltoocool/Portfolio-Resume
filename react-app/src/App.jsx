import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import SectionLoader from './components/SectionLoader.jsx';

// Every route is lazy, Home included. A static import of Home is what pins
// three.js into the shared entry chunk, which is why /blog and /book currently
// download the whole 3D stack.
const Home = lazy(() => import('./pages/Home.jsx'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex.jsx'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost.jsx'));
const AdminDashboard = lazy(() => import('./pages/blog/AdminDashboard.jsx'));
const BlogEditor = lazy(() => import('./pages/blog/BlogEditor.jsx'));
const BookMe = lazy(() => import('./pages/BookMe.jsx'));
const ManageBooking = lazy(() => import('./pages/ManageBooking.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Scrolls to #anchors after route changes (e.g. /blog → /#projects), else to top.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Home sections render behind a loader; retry briefly until the target exists.
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts++ < 40) {
          setTimeout(tryScroll, 150);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <SectionLoader />
  </div>
);

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      offset: 50,
      // AOS does not honour this by default, which made PRODUCT.md's claim that
      // entrance animations respect the preference untrue site-wide.
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  return (
    <>
      <ScrollManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* The index lives on the home page now; keep the old URL alive. */}
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/admin" element={<AdminDashboard />} />
          <Route path="/blog/admin/new" element={<BlogEditor />} />
          <Route path="/blog/admin/edit/:id" element={<BlogEditor />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/book" element={<BookMe />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Analytics />
    </>
  );
};

export default App;
