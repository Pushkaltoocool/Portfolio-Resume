import Button from '../components/Button.jsx';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden" id="home">
      
      {/* Background Grid & Spotlight */}
      <div className="absolute inset-0 w-full h-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-yellow-500/10 blur-[120px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-24 gap-10">
        
        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pt-20 md:pt-0">
          <div 
            className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 backdrop-blur-sm mb-6"
            data-aos="fade-down"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <p className="text-sm font-medium text-yellow-200/80 font-generalsans uppercase tracking-widest">
              AI & Full Stack Developer
            </p>
          </div>

          <h1 
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl font-generalsans text-center md:text-left leading-tight"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-600">
              Pushkal
            </span> 
          </h1>

          <p 
            className="mt-6 max-w-lg text-lg text-gray-400 sm:text-xl font-light text-center md:text-left"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            I build robust applications and intelligent AI solutions.  I believe practice makes perfect.
          </p>

          <div className="mt-10" data-aos="fade-up" data-aos-delay="300">
            <a href="#about">
              <Button 
                name="Let's work together" 
                isBeam 
                containerClass="sm:w-fit w-full sm:min-w-80" 
              />
            </a>
          </div>
        </div>

        {/* --- RIGHT SIDE: SKETCHFAB IFRAME --- */}
        <div 
          className="w-full md:w-1/2 flex justify-center items-center"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {/* Wrapper to make the iframe responsive */}
          <div className="relative w-full aspect-square max-w-[500px] group">
            {/* Subtle glow effect behind the model */}
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl group-hover:bg-yellow-500/30 transition-all duration-500"></div>
            
            <iframe
              title="Pokémon Horizons - Captain Pikachu"
              className="relative z-10 w-full h-full rounded-2xl border-none shadow-2xl"
              src="https://sketchfab.com/models/417d207eac734b358c6b22c43376560f/embed?preload=1&autostart=1&ui_hint=0&transparent=1"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;