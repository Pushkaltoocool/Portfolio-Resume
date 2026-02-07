import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = ({ onSelectProject }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNavigation = (direction) => {
    setIsZoomed(false);
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  return (
    <section className="c-space my-20" id="projects" data-aos="fade-up">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200" data-aos="fade-right" data-aos-delay="120">
          <div className="absolute top-0 right-0 z-0 pointer-events-none">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg z-10" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5 z-10">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo" title={tag.name}>
                  {tag.iconClass ? (
                    <i className={`${tag.iconClass} text-white text-lg`} aria-hidden="true"></i>
                  ) : (
                    <img src={tag.path} alt={tag.name} />
                  )}
                </div>
              ))}
            </div>

            <button
              className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-white transition-colors"
              onClick={() => onSelectProject(currentProject.title)}>
              <p>View Project Details</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </button>
          </div>

          <div className="flex justify-between items-center mt-7 z-10">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="relative border border-black-300 bg-black-200 rounded-lg overflow-hidden"
          style={{ height: '520px' }}
          data-aos="fade-left"
          data-aos-delay="180"
        >
          {isZoomed ? (
            <button
              type="button"
              onClick={toggleZoom}
              className="w-full h-full flex items-center justify-center bg-black-300 cursor-zoom-out"
            >
              <img
                src={currentProject.texture}
                alt={`${currentProject.title} preview`}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-3 right-3 text-white-600 text-xs bg-black-200/80 px-2 py-1 rounded border border-white-100/20">
                Click to return
              </span>
            </button>
          ) : (
            <button type="button" onClick={toggleZoom} className="w-full h-full cursor-zoom-in">
              <div className="absolute inset-0">
                <Canvas className="w-full h-full" style={{ width: '100%', height: '100%' }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 5]} intensity={0.8} />
                  <Center>
                    <Suspense fallback={<CanvasLoader />}>
                      <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                        <DemoComputer texture={currentProject.texture} flipVertical={currentProject.flipVertical} />
                      </group>
                    </Suspense>
                  </Center>
                  <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                </Canvas>
              </div>
              <span className="absolute top-3 right-3 text-white-600 text-xs bg-black-200/80 px-2 py-1 rounded border border-white-100/20">
                Click to zoom
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
