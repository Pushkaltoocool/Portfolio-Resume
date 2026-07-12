import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home.jsx';
import BlogIndex from './pages/blog/BlogIndex.jsx';
import BlogPost from './pages/blog/BlogPost.jsx';
import AdminDashboard from './pages/blog/AdminDashboard.jsx';
import BlogEditor from './pages/blog/BlogEditor.jsx';
import BookMe from './pages/BookMe.jsx';
import ManageBooking from './pages/ManageBooking.jsx';

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

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/admin" element={<AdminDashboard />} />
        <Route path="/blog/admin/new" element={<BlogEditor />} />
        <Route path="/blog/admin/edit/:id" element={<BlogEditor />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/book" element={<BookMe />} />
        <Route path="/manage-booking" element={<ManageBooking />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </>
  );
};

export default App;
