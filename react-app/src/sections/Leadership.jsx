import { leadership } from '../constants/index.js';

const Leadership = () => {
  return (
    <section className="c-space my-24" id="leadership">
      <div className="flex flex-col gap-3">
        <h3 className="head-text">Leadership & Service</h3>
        <p className="text-gray-400 text-lg">
          Driving community growth through student initiatives and peer mentorship.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-16">
        {leadership.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center glass-container p-8 rounded-3xl border border-white/5 bg-black/40 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-4">
              <img src={item.icon} alt={`${item.title} logo`} className="max-w-full max-h-full object-contain" />
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold text-white font-generalsans">
                {item.title}
              </h4>
              <div className="h-0.5 w-10 bg-white/20 mx-auto my-4 group-hover:w-20 group-hover:bg-blue-500 transition-all" />
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;