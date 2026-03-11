"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, Trail, Sphere, Text } from "@react-three/drei";

export default function NeuralLink({ isTyping }: { isTyping: boolean }) {
  const mainRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Data packets orbiting
  const packetCount = 8;
  const packets = useMemo(() => Array.from({ length: packetCount }, (_, i) => ({
    speed: 0.5 + Math.random() * 1.5,
    radius: 1.5 + Math.random() * 1.5,
    offset: Math.random() * Math.PI * 2,
    axisOffset: Math.random() * Math.PI
  })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (coreRef.current) {
      // Rotation
      coreRef.current.rotation.x = t * 0.2;
      coreRef.current.rotation.y = t * 0.3;
      
      // typing reaction
      const targetScale = isTyping ? 1.4 : 1;
      const targetDistort = isTyping ? 0.8 : 0.4;
      
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale + Math.sin(t * 5) * 0.05, 0.1));
    }
    
    if (mainRef.current) {
      // Gentle floating
      mainRef.current.position.y = Math.sin(t * 0.5) * 0.2;
      // Mouse sway
      mainRef.current.rotation.x = THREE.MathUtils.lerp(mainRef.current.rotation.x, state.pointer.y * 0.3, 0.1);
      mainRef.current.rotation.y = THREE.MathUtils.lerp(mainRef.current.rotation.y, state.pointer.x * 0.3, 0.1);
    }
  });

  return (
    <group ref={mainRef}>
      {/* Central Glass Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={coreRef}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial 
            color={isTyping ? "#00ffcc" : "#4444ff"} 
            speed={4} 
            distort={0.4} 
            radius={1}
            emissive={isTyping ? "#00ffcc" : "#4444ff"}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Internal Core Glow */}
        <mesh scale={0.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={isTyping ? "#00ffcc" : "#aa00ff"} transparent opacity={0.3} />
        </mesh>
        
        {/* Status text */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.15}
          color={isTyping ? "#00ffcc" : "#888"}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {isTyping ? "TRANSMISSION_ACTIVE" : "SECURE_LINK_STANDBY"}
        </Text>
      </Float>

      {/* Orbiting Data Packets */}
      {packets.map((pkt, i) => (
        <DataPacket key={i} {...pkt} isTyping={isTyping} />
      ))}

      {/* Connection Beams (only visible when typing) */}
      {isTyping && packets.slice(0, 4).map((_, i) => (
        <Beam key={i} index={i} />
      ))}
    </group>
  );
}

function DataPacket({ radius, speed, offset, axisOffset, isTyping }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * (isTyping ? speed * 3 : speed) + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * Math.cos(axisOffset) * radius;
      meshRef.current.position.y = Math.sin(t) * Math.sin(axisOffset) * radius;
    }
  });

  return (
    <Trail width={1.5} length={isTyping ? 15 : 6} color={isTyping ? "#00ffcc" : "#aa00ff"} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={isTyping ? "#00ffcc" : "#aa00ff"} />
      </mesh>
    </Trail>
  );
}

function Beam({ index }: { index: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const points = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    )
  ], []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.05;
      lineRef.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 10) * 0.2 + 1);
    }
  });

  return (
    <group rotation={[Math.random(), Math.random(), 0]}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 4]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
