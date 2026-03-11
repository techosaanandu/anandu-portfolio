"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, RoundedBox, MeshReflectorMaterial, Sphere } from "@react-three/drei";

export default function AbstractAvatar() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;

      // Mouse reactivity
      group.current.position.x += (state.pointer.x * 0.5 - group.current.position.x) * 0.05;
      group.current.position.y += (state.pointer.y * 0.5 - group.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core head shape */}
        <RoundedBox args={[1.5, 2, 1.5]} radius={0.5} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
        </RoundedBox>
        
        {/* Visor/Eye */}
        <mesh position={[0, 0.3, 0.8]}>
          <boxGeometry args={[1.2, 0.4, 0.1]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
        
        <mesh position={[0, 0.3, 0.9]} scale={1.05}>
          <boxGeometry args={[1.2, 0.4, 0.1]} />
          <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} />
        </mesh>

        {/* Floating Particles around head */}
        <Sphere args={[0.1, 16, 16]} position={[-1.2, 1, 0.5]}>
          <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={2} />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[1, -1, 0.8]}>
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} />
        </Sphere>
      </Float>
    </group>
  );
}
