import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { leadership } from '../constants/index.js';

const LeadershipIcon = () => {
  return (
    <Float floatIntensity={1.5} rotationIntensity={1.5}>
      <mesh>
        <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
        <meshStandardMaterial color="#4e6bff" emissive="#4e6bff" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
};

const Leadership = () => {
  return (
    <section className="c-space my-20" id="leadership">
      <h3 className="head-text">Leadership & Service</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-12">
        {leadership.map((item) => (
          <div key={item.id} className="three-d-card">
            <div className="three-d-card-content glass-container flex items-center gap-6">
              <div className="w-24 h-24 flex-shrink-0">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <LeadershipIcon />
                </Canvas>
              </div>
              <div>
                <p className="grid-headtext">{item.title}</p>
                <p className="grid-subtext mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
