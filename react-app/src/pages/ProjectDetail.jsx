import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import Layout from '../components/Layout.jsx';
import { getProjectBySlug, projectNeighbours } from '../lib/projects.js';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { prev, next } = projectNeighbours(slug);

  useEffect(() => {
    document.title = project ? `${project.title} · Pushkal Vashist` : 'Project not found';
    // The page now scrolls with the window, so AOS handles it natively. This
    // only nudges it to recalculate offsets after the route swapped content.
    const raf = requestAnimationFrame(() => AOS.refresh());
    return () => cancelAnimationFrame(raf);
  }, [slug, project]);

  if (!project) {
    return (
      <Layout>
        <div className="terminal-note max-w-xl" role="alert">
          <p className="text-red-400">$ error: no project with slug &ldquo;{slug}&rdquo;</p>
          <p className="text-white-600 mt-3">
            It may have been renamed.{' '}
            <Link to="/projects" className="text-blue-300/80 hover:text-blue-200">
              See all projects →
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="!max-w-none !px-0 !pt-24">
      {/* Background visuals, behind normal-flow content now that this is a page. */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <img
          src={project.spotlight}
          className="absolute top-0 right-0 w-[800px] h-[800px] object-contain opacity-30 blur-3xl"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Breadcrumb. Not sticky: the global navbar already is. */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={project.logoStyle}>
            <img src={project.logo} alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-white font-bold text-lg">{project.title}</span>
        </div>

        <Link
          to="/projects"
          className="font-mono text-sm text-white-500 hover:text-white transition-colors"
        >
          ← all projects
        </Link>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
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
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 group"
                            >
                                <img src="/assets/arrow-up.png" alt="arrow" className="w-4 h-4 invert group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Launch Live Demo
                            </a>
                        )}
                        {project.href && (
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold transition-all"
                            >
                                <img src="/assets/github.svg" alt="github" className="w-5 h-5 opacity-80" />
                                View Source Code
                            </a>
                        )}
                        {!project.live && !project.href && (
                            <a
                                href="/#contact"
                                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold transition-all text-center"
                            >
                                Request a walkthrough
                            </a>
                        )}
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
      </div>

      {/* Prev/next, replacing the browsing the old carousel arrows provided. */}
      <nav
        aria-label="Other projects"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 grid sm:grid-cols-2 gap-4"
      >
        {prev && (
          <Link to={`/projects/${prev.slug}`} className="glass-container group">
            <p className="font-mono text-[11px] text-white-500">← previous</p>
            <p className="mt-2 text-lg font-semibold text-white-700 group-hover:text-white transition-colors">
              {prev.title}
            </p>
          </Link>
        )}
        {next && (
          <Link to={`/projects/${next.slug}`} className="glass-container group sm:text-right">
            <p className="font-mono text-[11px] text-white-500">next →</p>
            <p className="mt-2 text-lg font-semibold text-white-700 group-hover:text-white transition-colors">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </Layout>
  );
};

export default ProjectDetail;