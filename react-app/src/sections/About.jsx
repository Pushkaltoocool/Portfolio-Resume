import { useState } from 'react';
import Globe from 'react-globe.gl';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls } from '@react-three/drei';
import Button from '../components/Button.jsx';
import CanvasLoader from '../components/Loading.jsx';
import Rocket from '../components/Rocket.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pushkal.vashist@gmail.com');
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        
        {/* Block 1: Intro Profile */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container flex flex-col items-center justify-center text-center">
            <div className="w-full h-[200px] rounded-2xl border border-white/10 mb-6 overflow-hidden">
              <img src="/assets/grid1.png" alt="profile visual" className="w-full h-full object-cover" />
            </div>

            <div>
              <p className="grid-headtext">Hi, I’m Pushkal Vashist</p>
              <p className="grid-subtext mt-4">
                A Diploma student at Nanyang Polytechnic, specializing in <span className="text-blue-400">Applied AI & Analytics</span>. I bridge the gap between complex research and field-ready systems.
              </p>
            </div>
          </div>
        </div>

        {/* Block 2: Tech Stack (Live List) */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container flex flex-col justify-between">
            <div className="w-full h-full min-h-[150px] rounded-2xl border border-white/10 overflow-hidden">
              <img src="/assets/grid2.png" alt="tech stack visual" className="w-full h-full object-cover" />
            </div>

            <div className="mt-4">
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                Proficient in Python, C++, and Full-Stack Development. I leverage Cloud (AWS/Azure) to deploy scalable AI solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Block 3: Globe Location */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container flex flex-col h-full justify-between">
            <div className="rounded-3xl w-full h-[250px] sm:h-[300px] flex justify-center items-center overflow-hidden relative">
              <Globe
                height={350}
                width={350}
                backgroundColor="rgba(0,0,0,0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 1.3521, lng: 103.8198, text: 'Singapore', color: 'white', size: 20 }]}
                onGlobeClick={() => window.open("https://maps.google.com/?q=Singapore", "_blank")}
              />
            </div>
            <div className="mt-4">
              <p className="grid-headtext">I’m based in Singapore</p>
              <p className="grid-subtext">Open to global collaborations, internships, and hackathons.</p>
              <a href="#contact" className="w-full inline-block mt-5">
                 <Button name="Contact Me" isBeam containerClass="w-full" />
              </a>
            </div>
          </div>
        </div>

        {/* Block 4: My Mission */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 h-[200px] rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10 w-full h-full">
                    <Canvas camera={{ fov: 45, near: 0.1, far: 1000 }}>
                      <ambientLight intensity={1.4} />
                      <hemisphereLight groundColor="#111827" intensity={0.8} />
                      <directionalLight position={[5, 8, 5]} intensity={1.5} />
                      <Suspense fallback={<CanvasLoader />}>
                        <Bounds fit clip observe margin={1.25}>
                          <Center>
                            <group rotation={[0, -Math.PI / 5, 0]}>
                              <Rocket />
                            </group>
                          </Center>
                        </Bounds>
                      </Suspense>
                      <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={2}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={(Math.PI * 2) / 3}
                      />
                    </Canvas>
                 </div>
            </div>

            <div className="w-full md:w-1/2">
              <p className="grid-headtext">My Mission</p>
              <p className="grid-subtext mt-4">
                I turn complex AI ideas into practical, production-ready systems. My focus is building solutions that go beyond working prototypes to deliver measurable impact across real-world business and community challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Block 5: Contact Copy */}
<div className="xl:col-span-1 xl:row-span-2">
  <div className="grid-container flex flex-col justify-center items-center text-center">
    
    <div className="space-y-6 w-full">
      <p className="grid-subtext text-gray-400 font-medium">Have a project in mind?</p>
      
      <div 
        className="group relative w-full p-6 rounded-2xl bg-black-200 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden" 
        onClick={handleCopy}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Icon Container */}
          <div className={`p-3 rounded-xl transition-all duration-300 ${hasCopied ? 'bg-green-500/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
            <img 
              src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} 
              alt="copy" 
              className={`w-6 h-6 transition-transform duration-300 ${hasCopied ? 'scale-110' : 'group-hover:scale-110'}`} 
            />
          </div>

          {/* Dynamic Text */}
          <div className="space-y-1">
            <p className={`text-lg md:text-xl font-bold transition-colors duration-300 ${hasCopied ? 'text-green-400' : 'text-white group-hover:text-blue-400'}`}>
              {hasCopied ? 'Email Copied!' : 'pushkal.vashist@gmail.com'}
            </p>
            
            {!hasCopied && (
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                Click to copy address
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

      </div>
    </section>
  );
};

export default About;