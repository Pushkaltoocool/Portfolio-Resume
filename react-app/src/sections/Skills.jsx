import { useState } from 'react';
import { skills } from '../constants/index.js';

const iconByTitle = {
  'AI & Machine Learning': 'fa-solid fa-brain',
  'Full-Stack Engineering': 'fa-solid fa-code',
  'Cloud & DevOps': 'fa-solid fa-cloud',
  'Data & BI Systems': 'fa-solid fa-database',
};

const Skills = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="c-space my-24" id="skills">
      <div className="flex flex-col gap-4 mb-12">
        <h3 className="text-4xl font-bold text-white font-generalsans">Skills & Expertise</h3>
        <p className="text-gray-400">The technical stack I use to bring intelligent ideas to life.</p>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {skills.map((skillGroup, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>
            
            <div className="relative flex flex-row items-center gap-6 glass-container p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl">

              <div className="hidden sm:flex w-20 h-20 rounded-2xl flex-shrink-0 items-center justify-center border border-white/10 bg-white/5">
                <i
                  className={`${iconByTitle[skillGroup.title] || 'fa-solid fa-star'} text-3xl ${hoveredIndex === index ? 'text-yellow-400' : 'text-white-700'} transition-colors duration-300`}
                  aria-hidden="true"
                ></i>
              </div>

              {/* Text Side */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  {skillGroup.title}
                  {hoveredIndex === index && <span className="text-yellow-400 text-sm animate-pulse">●</span>}
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-white/5 text-gray-300 rounded-full text-xs font-medium border border-white/10 group-hover:border-yellow-500/50 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;