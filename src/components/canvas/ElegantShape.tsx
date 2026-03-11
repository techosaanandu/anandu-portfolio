"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef } from "react";

export default function ElegantShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      
      meshRef.current.rotation.x += (state.pointer.y * 0.5 - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (state.pointer.x * 0.5 - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
        <MeshTransmissionMaterial 
          backside 
          thickness={0.5} 
          roughness={0.05} 
          transmission={1} 
          ior={1.2} 
          chromaticAberration={0.05} 
          color="#00ffcc"
        />
      </mesh>
      
     
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={2} />
      </mesh>
    </Float>
  );
}
