import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function FloatingNodes() {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const nodes = [];
  for (let i = 0; i < 50; i++) {
    const radius = 4 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    nodes.push({ position: [x, y, z], key: i });
  }

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <mesh key={node.key} position={node.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CenterCore() {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      const scale = 1 + 0.1 * Math.sin(state.clock.elapsedTime * 2);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <FloatingNodes />
        <CenterCore />
      </Canvas>
    </div>
  );
}