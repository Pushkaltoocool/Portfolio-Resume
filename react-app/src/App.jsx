import { Suspense, useState } from 'react';
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

const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
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
  );
};

export default App;
