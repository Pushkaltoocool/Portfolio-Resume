import Navbar from '../sections/Navbar.jsx';
import Footer from '../sections/Footer.jsx';

/**
 * The page shell the blog and booking pages already hand-roll. Used by the
 * newer routed pages; the existing pages are left alone deliberately, since
 * ManageBooking intentionally renders no footer.
 */
const Layout = ({ children, className = '' }) => (
  <>
    <Navbar />
    <main className={`max-w-7xl mx-auto relative c-space pt-32 pb-20 min-h-screen ${className}`}>{children}</main>
    <div className="max-w-7xl mx-auto">
      <Footer />
    </div>
  </>
);

export default Layout;
