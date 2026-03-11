"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PresentationControls, Float, RoundedBox, Html, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";

export default function Bento3D() {
  const tRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (tRef.current) {
      tRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <Float rotationIntensity={0.2} speed={1.5}>
        <group ref={tRef}>
          {/* Main large glass box */}
          <RoundedBox args={[3.5, 3.5, 0.5]} radius={0.15} smoothness={4} position={[-1.2, 0, 0]}>
            <MeshTransmissionMaterial 
              backside thickness={0.5} roughness={0.1} 
              transmission={1} ior={1.2} chromaticAberration={0.04} 
              color="#ffffff" 
            />
            <Html transform position={[0, 0, 0.3]} className="pointer-events-none w-[260px]">
              <div className="bg-black/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-indigo-500 mb-2 leading-tight">
                  NEXT-GEN<br/>DEVELOPER
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Merging deep-level engineering with high-concept user interfaces. I build digital experiences that defy the ordinary.
                </p>
              </div>
            </Html>
          </RoundedBox>

          {/* Top right box (smaller glowing green) */}
          <RoundedBox args={[2.2, 1.4, 0.5]} radius={0.1} smoothness={4} position={[2, 1, 0.3]} rotation={[0, -0.2, 0]}>
            <MeshTransmissionMaterial 
              thickness={0.2} roughness={0.2} 
              transmission={0.9} ior={1.5} color="#00ffcc" 
            />
            <Html transform position={[0, 0, 0.3]} className="pointer-events-none">
              <div className="font-bold text-black bg-white/90 px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_#00ffcc]">
                Creative Engineering
              </div>
            </Html>
          </RoundedBox>

          {/* Bottom right box (tall dark) */}
          <RoundedBox args={[1.8, 2.2, 0.5]} radius={0.1} smoothness={4} position={[2.2, -1.1, -0.5]} rotation={[0.2, 0.3, 0]}>
            <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.9} />
            <Text
              position={[0, 0, 0.26]}
              fontSize={0.25}
              color="#aa00ff"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.4}
              textAlign="center"
              fontWeight="bold"
            >
              "OUT OF THE BOX"
            </Text>
            {/* Subtle glow rim for the dark box */}
            <mesh position={[0, 0, -0.26]}>
               <planeGeometry args={[1.7, 2.1]} />
               <meshBasicMaterial color="#aa00ff" transparent opacity={0.2} />
            </mesh>
          </RoundedBox>

          {/* Decorative Floating Sphere */}
          <Float speed={3} rotationIntensity={2} floatIntensity={4}>
            <mesh position={[-3, -2, 1]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
            </mesh>
          </Float>

          {/* Decorative Wireframe Icosahedron */}
          <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
            <mesh position={[3.5, 2, -1]}>
              <icosahedronGeometry args={[0.6, 0]} />
              <meshStandardMaterial color="#3b00ff" wireframe />
            </mesh>
          </Float>
        </group>
      </Float>
    </PresentationControls>
  );
}
