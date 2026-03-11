"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Torus, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedGeometry({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Interactive scale
      const scaleBase = 1.5;
      meshRef.current.scale.setScalar(scaleBase + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  const materialContent = (
    <MeshDistortMaterial 
      color={index === 0 ? "#aa00ff" : index === 1 ? "#00ffcc" : "#00g8ff"} 
      attach="material" 
      distort={0.4} 
      speed={2} 
      roughness={0.2} 
      wireframe
    />
  );

  if (index === 0) {
    return (
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        {materialContent}
      </Sphere>
    );
  } else if (index === 1) {
    return (
      <Box ref={meshRef} args={[1.2, 1.2, 1.2]}>
        {materialContent}
      </Box>
    );
  } else {
    return (
      <Torus ref={meshRef} args={[0.8, 0.4, 16, 100]}>
        {materialContent}
      </Torus>
    );
  }
}

export default function ProjectCardBg({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none scale-150">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1} />
        <AnimatedGeometry index={index} />
      </Canvas>
    </div>
  );
}
