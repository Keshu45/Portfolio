import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function CoreObject() {
  const meshRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      outerRef.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
      <group ref={meshRef}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[4, 1]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[2.5, 0]} />
          <meshPhongMaterial 
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SimpleParticles() {
  const count = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 15 + Math.random() * 15;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#d946ef" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 60 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]} // Limit pixel ratio for better mobile performance
      gl={{ antialias: false, powerPreference: "high-performance" }} // Optimizations
    >
      <fog attach="fog" args={['#000000', 10, 40]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      
      <CoreObject />
      <SimpleParticles />
    </Canvas>
  );
}
