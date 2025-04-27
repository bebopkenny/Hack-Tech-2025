'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const GlobeModel = () => {
  const { scene } = useGLTF('/models/sustainable_globe.glb');
  return <primitive object={scene} scale={0.7} />;
};

const SustainableGlobe = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <GlobeModel />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default SustainableGlobe;
