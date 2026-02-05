import { awards } from '../constants/index.js';

const Awards = () => {
  return (
    <section className="c-space my-20" id="awards" data-aos="fade-up">
      <h3 className="head-text">Awards & Recognition</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-12">
        {awards.map((item, index) => (
          <div
            key={`award-${item.id}`}
            className="three-d-card"
            data-aos="zoom-in-up"
            data-aos-delay={100 + index * 60}
          >
            <div className="three-d-card-content glass-container !p-0 overflow-hidden flex flex-col h-full">
              {item.icon ? (
                <div className="w-full h-72 bg-black-200 relative">
                  <img src={item.icon} alt={`${item.title} award`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-72 bg-black-200 flex items-center justify-center">
                   <div className="flex gap-3 items-center">
                      <span className="px-3 py-1 rounded-full bg-black-300 text-white-600 text-xs font-medium border border-white-100">
                        {item.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30 flex items-center gap-1">
                        🚀 {item.badge}
                      </span>
                   </div>
                </div>
              )}

              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-black-300 text-white-600 text-[10px] font-medium">
                    {item.year}
                  </span>
                  {item.badge && item.id !== 4 && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      item.badge === 'Champion' ? 'bg-orange-500 text-white' : 'bg-white-700 text-black'
                    }`}>
                      {item.badge === 'Champion' ? '🏆' : '🥈'} {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-white text-2xl font-bold mb-1">{item.title}</h4>
                <p className="text-white-600 text-sm mb-3 font-medium">{item.organization}</p>
                
                {item.description && (
                  <p className="text-white-500 font-light text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                )}

                {item.highlights && (
                  <div className="flex flex-col gap-3 mb-6">
                    <h5 className="text-white font-semibold text-base">Additional Highlights</h5>
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center justify-between bg-black-300/50 p-2 rounded-lg border border-white-100/10">
                        <span className="text-white-700 text-sm font-medium">{h.name}</span>
                        <span className="text-white-800 text-xs bg-black-200 px-2 py-1 rounded">{h.rank}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto">
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white-600 hover:text-white transition-colors text-sm font-medium bg-black-300 w-fit px-4 py-2 rounded-lg border border-white-100/10"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      View LinkedIn Post
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
