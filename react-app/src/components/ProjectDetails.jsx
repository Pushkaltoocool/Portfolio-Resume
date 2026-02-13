import { useEffect, useState } from 'react';
import AOS from 'aos';

import { myProjects, navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const ProjectDetails = ({ projectId, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const project = myProjects.find((p) => p.title === projectId);

  useEffect(() => {
    AOS.refreshHard();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeAndReturn = (event) => {
    if (event) event.preventDefault();
    setIsOpen(false);
    onClose();
  };

  if (!project) return null;

  return (
    <div className="min-h-screen w-full bg-[#010103]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-black-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-5 mx-auto c-space">
            <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors" onClick={closeAndReturn}>
              Pushkal
            </a>

            <button
              onClick={toggleMenu}
              className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
              aria-label="Toggle menu"
            >
              <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="toggle" className="w-6 h-6" />
            </button>

            <nav className="sm:flex hidden">
              <NavItems onClick={closeAndReturn} />
            </nav>
          </div>
        </div>

        <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <nav className="p-5">
            <NavItems onClick={closeAndReturn} />
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 pt-32 pb-20">
        <div className="flex flex-col items-center text-center mb-20" data-aos="fade-down">
          <span className="px-4 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold mb-6 border border-orange-500/30 tracking-wider">
            {project.badge}
          </span>
          <h1 className="text-white md:text-8xl text-6xl font-bold mb-4 tracking-tight">{project.title}</h1>
          <p className="text-white-600 text-2xl font-medium">{project.competition}</p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-16">
          <div className="lg:col-span-2 space-y-16" data-aos="fade-up" data-aos-delay="80">
            <section data-aos="fade-up" data-aos-delay="100">
              <h2 className="text-blue-500 text-4xl font-bold mb-8">The Challenge</h2>
              <p className="text-white-600 text-xl leading-relaxed font-light">
                {project.details.challenge}
              </p>
            </section>

            <section data-aos="fade-up" data-aos-delay="140">
              <h2 className="text-blue-500 text-4xl font-bold mb-8">Our Solution</h2>
              <p className="text-white-600 text-xl leading-relaxed font-light">
                {project.details.solution}
              </p>
            </section>

            {project.details.keyResults && (
              <section data-aos="fade-up" data-aos-delay="180">
                <h2 className="text-blue-500 text-4xl font-bold mb-8">Key Results</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
                  {project.details.keyResults.map((result, index) => (
                    <div key={index} className="bg-white/[0.02] border border-white/10 rounded-2xl p-10 text-center hover:bg-white/[0.04] transition-all">
                      <p className="text-green-500 text-6xl font-bold mb-3">{result.value}</p>
                      <p className="text-white-600 text-lg font-medium">{result.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.details.keyFeatures && (
              <section data-aos="fade-up" data-aos-delay="220">
                <h2 className="text-blue-500 text-4xl font-bold mb-8">Key Features</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  {project.details.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.04] transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <p className="text-white-600 text-lg font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-16" data-aos="fade-left" data-aos-delay="140">
            <section data-aos="fade-left" data-aos-delay="180">
              <h3 className="text-white text-2xl font-bold mb-8 border-b border-white/10 pb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span key={tag.id} className="px-4 py-2 rounded-lg bg-black-300 text-white-600 text-sm font-semibold border border-white/5 hover:border-white/20 transition-all">
                    {tag.name}
                  </span>
                ))}
              </div>
            </section>

            <section data-aos="fade-left" data-aos-delay="220">
              <h3 className="text-white text-2xl font-bold mb-8 border-b border-white/10 pb-4">Links</h3>
              <div className="flex flex-col gap-5">
                <a href={project.href} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border border-blue-500 text-blue-500 font-bold hover:bg-blue-500/10 transition-all group">
                  <img src="/assets/github.svg" alt="github" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  View Code
                </a>
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group">
                  <img src="/assets/arrow-up.png" alt="live" className="w-5 h-5 invert group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Live Demo
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <footer className="max-w-7xl mx-auto px-5 py-10 border-t border-black-300 text-center" data-aos="fade-up" data-aos-delay="120">
        <p className="text-white-500">© 2025 Pushkal Vashist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProjectDetails;
