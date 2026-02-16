import { Suspense, useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Awards from './sections/Awards.jsx';
import Skills from './sections/Skills.jsx';
import Leadership from './sections/Leadership.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import SectionLoader from './components/SectionLoader.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import Loader from './components/Loader.jsx';

const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const { progress, active } = useProgress();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    if (!active && progress >= 100) {
      const timeout = setTimeout(() => setShowLoader(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  useEffect(() => {
    if (!showLoader) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showLoader]);

  return (
    <>
      {showLoader && <Loader />}

      <main className="max-w-7xl mx-auto relative">
        {selectedProjectId ? (
          <ProjectDetails projectId={selectedProjectId} onClose={() => setSelectedProjectId(null)} />
        ) : (
          <>
            <Navbar />
            <Hero />
            <About />
            <Suspense fallback={<SectionLoader />}>
              <WorkExperience />
              <Projects onSelectProject={setSelectedProjectId} />
              <Awards />
              <Skills />
              <Leadership />
            </Suspense>
            <Contact />
            <Footer />
          </>
        )}
      </main>
      <Analytics />
    </>
  );
};

export default App;
