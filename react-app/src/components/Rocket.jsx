import { useGLTF } from '@react-three/drei';

const Rocket = (props) => {
  const { scene } = useGLTF('/models/rocket.glb');

  return <primitive object={scene} {...props} />;
};

useGLTF.preload('/models/rocket.glb');

export default Rocket;