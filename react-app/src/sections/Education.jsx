import { education, certifications } from '../constants/index.js';

const Education = () => {
  return (
    <section className="c-space my-24" id="education">
      <div className="flex flex-col gap-3">
        <h3 className="head-text">Education & Certification</h3>
        <p className="text-gray-400 text-lg">
          Applied AI and analytics at Nanyang Polytechnic, top of cohort, with an exchange semester in South Korea.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-14">
        {education.map((item, index) => (
          <div
            key={item.id}
            className="glass-container p-8 rounded-3xl border border-white/5 bg-black/40 hover:border-white/20 transition-all duration-300 flex flex-col"
            data-aos="fade-up"
            data-aos-delay={index * 120}
          >
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-2">
                <img src={item.logo} alt={`${item.school} logo`} className="max-w-full max-h-full object-contain" />
              </div>

              <div className="min-w-0">
                <h4 className="text-xl font-bold text-white font-generalsans">{item.school}</h4>
                <p className="text-white-600 text-sm mt-1">{item.location}</p>
                <p className="text-gray-300 text-sm mt-3 font-medium">{item.qualification}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="px-2.5 py-1 rounded bg-black-300 text-white-600 text-[11px] font-medium font-mono">
                    {item.duration}
                  </span>
                  {item.status && (
                    <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 text-[11px] font-medium border border-blue-500/25">
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {item.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-7">
                {item.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10"
                  >
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {item.highlights.length > 0 && (
              <ul className="mt-7 space-y-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.modules.length > 0 && (
              <div className="mt-auto pt-7">
                <p className="text-white-600 text-[11px] uppercase tracking-[0.18em] font-bold mb-3">
                  Selected coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.modules.map((module) => (
                    <span
                      key={module}
                      className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-full text-xs font-medium border border-white/10"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12" data-aos="fade-up">
        <p className="text-white-600 text-[11px] uppercase tracking-[0.18em] font-bold mb-5">Certifications</p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-5 glass-container p-5 rounded-2xl border border-white/5 bg-black/30 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                <img src={cert.badge} alt={`${cert.name} badge`} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-snug">{cert.name}</p>
                <p className="text-white-600 text-xs mt-1">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
