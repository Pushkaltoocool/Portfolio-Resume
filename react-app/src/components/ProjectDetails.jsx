import { useEffect, useRef } from 'react';
import AOS from 'aos';
import { myProjects } from '../constants/index.js';

const ProjectDetails = ({ projectId, onClose }) => {
    const scrollContainerRef = useRef(null);
  const project = myProjects.find((p) => p.title === projectId);

  useEffect(() => {
    AOS.refreshHard();

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const animatedElements = scrollContainer.querySelectorAll('[data-aos]');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            },
            {
                root: scrollContainer,
                threshold: 0.15,
            }
        );

        animatedElements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, [projectId]);

  if (!project) return null;

  return (
    <div ref={scrollContainerRef} className="fixed inset-0 z-50 w-full h-full bg-[#010103] overflow-y-auto animate-fade-in">
      
      {/* 1. Background Visuals (Consistent with Hero) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <img 
            src={project.spotlight} 
            className="absolute top-0 right-0 w-[800px] h-[800px] object-contain opacity-30 blur-3xl" 
            alt="glow" 
        />
      </div>

      {/* 2. Sticky Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={project.logoStyle}
            >
                <img src={project.logo} alt="logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">{project.title}</span>
          </div>

          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-300 hover:text-white"
          >
            <span className="text-sm font-medium">Close Project</span>
            <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                <img src="/assets/close.svg" alt="close" className="w-3 h-3 invert" />
            </div>
          </button>
        </div>
      </header>

      {/* 3. Main Content Wrapper */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Project Header */}
        <div className="text-center max-w-4xl mx-auto mb-20" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                {project.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-generalsans tracking-tight">
                {project.title}
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                {project.desc}
            </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column: Narrative (2/3 width) */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Image Showcase */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group" data-aos="fade-up" data-aos-delay="100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img 
                        src={project.texture} 
                        alt="Project Demo" 
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                </div>

                {/* Challenge & Solution */}
                <div className="grid gap-12">
                    <section data-aos="fade-up">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-red-500">01.</span> The Challenge
                        </h3>
                        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.details.challenge}
                            </p>
                        </div>
                    </section>

                    <section data-aos="fade-up">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-green-500">02.</span> The Solution
                        </h3>
                        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.details.solution}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Key Results (Stats) */}
                {project.details.keyResults && (
                    <section data-aos="fade-up">
                         <h3 className="text-2xl font-bold text-white mb-6">Impact & Results</h3>
                         <div className="grid sm:grid-cols-2 gap-4">
                            {project.details.keyResults.map((res, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-green-500/30 transition-all group">
                                    <h4 className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                        {res.value}
                                    </h4>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                                        {res.label}
                                    </p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}
            </div>

            {/* Right Column: Meta Info (1/3 width) - Sticky */}
            <div className="relative">
                <div className="lg:sticky lg:top-28 space-y-8" data-aos="fade-left" data-aos-delay="200">
                    
                    {/* Action Buttons */}
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                        <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 group"
                        >
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-4 h-4 invert group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Launch Live Demo
                        </a>
                        <a 
                            href={project.href} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold transition-all"
                        >
                            <img src="/assets/github.svg" alt="github" className="w-5 h-5 opacity-80" />
                            View Source Code
                        </a>
                    </div>

                    {/* Tech Stack */}
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <div 
                                    key={tag.id} 
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 hover:border-blue-500/50 transition-colors cursor-default"
                                >
                                    {/* Render icon if FontAwesome is available, else fallback to name */}
                                    <i className={`${tag.iconClass} text-gray-400 text-xs`}></i>
                                    <span className="text-sm text-gray-300 font-medium">{tag.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Features List */}
                    {project.details.keyFeatures && (
                         <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
                            <h4 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Key Features</h4>
                            <ul className="space-y-4">
                                {project.details.keyFeatures.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                        <span className="text-sm leading-relaxed">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center">
                <p className="text-gray-600 text-sm">© 2026 Pushkal Vashist. Designed for impact.</p>
      </footer>

    </div>
  );
};

export default ProjectDetails;