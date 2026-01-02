import { myProjects } from '../constants/index.js';

const ProjectDetails = ({ projectId, onClose }) => {
  const project = myProjects.find((p) => p.title === projectId);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#010103] overflow-y-auto">
      <nav className="max-w-7xl mx-auto px-5 py-5 flex justify-between items-center border-b border-black-300 sticky top-0 bg-[#010103]/80 backdrop-blur-md z-10">
        <p className="text-white text-xl font-bold">Pushkal Vashist</p>
        <div className="flex gap-8 items-center max-md:hidden">
            <button onClick={onClose} className="text-white-600 hover:text-white transition-colors text-sm font-medium">Home</button>
            <button onClick={onClose} className="text-white-600 hover:text-white transition-colors text-sm font-medium">About</button>
            <button onClick={onClose} className="text-white-600 hover:text-white transition-colors text-sm font-medium">Projects</button>
            <button onClick={onClose} className="text-white-600 hover:text-white transition-colors text-sm font-medium">Contact</button>
            <button 
                onClick={onClose} 
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium border border-white/10"
            >
                Back to Portfolio
            </button>
        </div>
        <button 
            onClick={onClose} 
            className="md:hidden bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium border border-white/10"
        >
            Back
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="px-4 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold mb-6 border border-orange-500/30 tracking-wider">
            {project.badge}
          </span>
          <h1 className="text-white md:text-8xl text-6xl font-bold mb-4 tracking-tight">{project.title}</h1>
          <p className="text-white-600 text-2xl font-medium">{project.competition}</p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-blue-500 text-4xl font-bold mb-8">The Challenge</h2>
              <p className="text-white-600 text-xl leading-relaxed font-light">
                {project.details.challenge}
              </p>
            </section>

            <section>
              <h2 className="text-blue-500 text-4xl font-bold mb-8">Our Solution</h2>
              <p className="text-white-600 text-xl leading-relaxed font-light">
                {project.details.solution}
              </p>
            </section>

            {project.details.keyResults && (
              <section>
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
              <section>
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

          <div className="space-y-16">
            <section>
              <h3 className="text-white text-2xl font-bold mb-8 border-b border-white/10 pb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span key={tag.id} className="px-4 py-2 rounded-lg bg-black-300 text-white-600 text-sm font-semibold border border-white/5 hover:border-white/20 transition-all">
                    {tag.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
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
      
      <footer className="max-w-7xl mx-auto px-5 py-10 border-t border-black-300 text-center">
        <p className="text-white-500">© 2025 Pushkal Vashist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProjectDetails;
