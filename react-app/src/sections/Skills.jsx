import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { skills } from '../constants/index.js';

const SkillCube = () => {
  return (
    <Float floatIntensity={2} rotationIntensity={2}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#4d4d4d" emissive="#1a1a1a" roughness={0} metalness={1} />
      </mesh>
    </Float>
  );
};

const Skills = () => {
  return (
    <section className="c-space my-20" id="skills" data-aos="fade-up">
      <h3 className="head-text">Skills & Certifications</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-12">
        {skills.map((skillGroup, index) => (
          <div
            key={index}
            className="three-d-card"
            data-aos="fade-up"
            data-aos-delay={100 + index * 80}
          >
            <div className="three-d-card-content glass-container flex flex-row items-center gap-6">
              <div className="hidden sm:block w-32 h-32">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1} />
                  <SkillCube />
                </Canvas>
              </div>
              <div className="flex-1">
                <p className="grid-headtext">{skillGroup.title}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-black-300 text-white-600 rounded-lg text-sm border border-black-500 hover:border-white/50 transition-colors cursor-default">
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
