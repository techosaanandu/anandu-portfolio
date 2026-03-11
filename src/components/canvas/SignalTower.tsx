"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial, Trail, Sphere } from "@react-three/drei";

export default function SignalTower({ isTyping }: { isTyping: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Create an array for the rings
  const rings = [0.8, 1.2, 1.6];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (coreRef.current) {
      // Pulse faster when typing
      const pulseRate = isTyping ? 3 : 1;
      const targetPulse = isTyping ? 1.5 : 1;
      
      coreRef.current.scale.x = THREE.MathUtils.lerp(coreRef.current.scale.x, targetPulse + Math.sin(t * pulseRate) * 0.1, 0.1);
      coreRef.current.scale.y = THREE.MathUtils.lerp(coreRef.current.scale.y, targetPulse + Math.sin(t * pulseRate) * 0.1, 0.1);
      coreRef.current.scale.z = THREE.MathUtils.lerp(coreRef.current.scale.z, targetPulse + Math.sin(t * pulseRate) * 0.1, 0.1);
      
      // Mouse interaction
      coreRef.current.position.y = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group>
      {/* Central Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.5, 2]} />
        <MeshDistortMaterial 
          color={isTyping ? "#00ffcc" : "#4444ff"} 
          emissive={isTyping ? "#00ffcc" : "#111"}
          emissiveIntensity={isTyping ? 2 : 0.5}
          distort={0.4} 
          speed={isTyping ? 5 : 2} 
          roughness={0.2} 
        />
      </mesh>

      {/* Orbiting particles */}
      {rings.map((radius, i) => (
        <OrbitingParticle key={i} radius={radius} speed={isTyping ? (i + 1) * 2 : (i + 1) * 0.5} color={isTyping ? "#00ffcc" : "#aa00ff"} offset={Math.PI * i} />
      ))}
    </group>
  );
}

function OrbitingParticle({ radius, speed, color, offset }: { radius: number, speed: number, color: string, offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Trail width={2} length={8} color={new THREE.Color(color).clone().multiplyScalar(2)} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}
