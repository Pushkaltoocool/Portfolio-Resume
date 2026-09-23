import { Suspense } from 'react';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Footer from '../sections/Footer.jsx';
import Navbar from '../sections/Navbar.jsx';
import Contact from '../sections/Contact.jsx';
import Awards from '../sections/Awards.jsx';
import Education from '../sections/Education.jsx';
import Skills from '../sections/Skills.jsx';
import Leadership from '../sections/Leadership.jsx';
import Projects from '../sections/Projects.jsx';
import WorkExperience from '../sections/Experience.jsx';
import SectionLoader from '../components/SectionLoader.jsx';
import SceneGate from '../components/SceneGate.jsx';

const Home = () => {
  return (
    <>
      <SceneGate />

      <main className="max-w-7xl mx-auto relative">
        <Navbar />
        <Hero />
        <About />
        <Suspense fallback={<SectionLoader />}>
          <WorkExperience />
          <Projects />
          <Awards />
          <Education />
          <Skills />
          <Leadership />
        </Suspense>
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
