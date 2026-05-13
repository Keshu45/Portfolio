import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';

function Particles() {
  const points = useRef<THREE.Points>(null!);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color('#00d2ff');
    const colorB = new THREE.Color('#b026ff');
    const colorC = new THREE.Color('#00ffcc');

    for (let i = 0; i < count; i++) {
        // Distribute points in a wide cylindrical/spherical volume
        const theta = Math.random() * 2 * Math.PI;
        const radius = 10 + Math.random() * 40;
        const y = (Math.random() - 0.5) * 50;

        positions[i * 3] = radius * Math.cos(theta);
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = radius * Math.sin(theta);

        const mixedColor = colorA.clone().lerp(
            Math.random() > 0.5 ? colorB : colorC,
            Math.random()
        );
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
        points.current.rotation.y = state.clock.elapsedTime * 0.05;
        // Float effect on Y
        points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={['#0a0a0e', 10, 50]} />
      <ambientLight intensity={0.5} />
      <Particles />
      <GridBackground />
    </Canvas>
  );
}

function GridBackground() {
  const gridRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 10;
    }
  });

  return (
    <group ref={gridRef}>
        <gridHelper args={[200, 40, '#39ff14', '#0a0a0e']} position={[0, -10, 0]} />
        <gridHelper args={[200, 40, '#00d2ff', '#0a0a0e']} position={[0, 15, 0]} />
    </group>
  );
}
