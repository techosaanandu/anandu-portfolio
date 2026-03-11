"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function HeroModel() {
  const outerRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (outerRef.current) {
      // Gentle floating and mouse sway
      outerRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, state.pointer.y * 0.2, 0.05);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, state.pointer.x * 0.2, 0.05);
    }
    
    if (crystalRef.current) {
      crystalRef.current.rotation.z = t * 0.1;
      crystalRef.current.rotation.y = t * 0.2;
      
      // Reactive distortion/thickeness on hover
      const targetThickness = hovered ? 1.5 : 0.5;
      const targetIor = hovered ? 1.8 : 1.2;
      
      crystalRef.current.scale.setScalar(THREE.MathUtils.lerp(crystalRef.current.scale.x, active ? 1.5 : (hovered ? 1.2 : 1), 0.1));
    }
  });

  return (
    <group ref={outerRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main Crystal Core */}
        <mesh 
          ref={crystalRef} 
          onClick={() => setActive(!active)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1.5, 0]} />
          <MeshTransmissionMaterial 
            backside 
            thickness={1} 
            roughness={0.05} 
            transmission={1} 
            ior={1.4} 
            chromaticAberration={0.06} 
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.5}
            color={hovered ? "#00ffcc" : active ? "#aa00ff" : "#ffffff"} 
          />
        </mesh>
        
        {/* Wireframe shell */}
        <mesh rotation={[Math.PI / 4, 0, 0]} scale={hovered ? 1.1 : 1.05}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial 
            color={hovered ? "#00ffcc" : "#3b00ff"} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>
        
        {/* Dynamic Emissive Core Pulse */}
        <mesh scale={0.45}>
           <octahedronGeometry args={[1, 0]} />
           <meshBasicMaterial color="#00ffcc" toneMapped={false}>
              <color attach="color" args={["#00ffcc"]} />
           </meshBasicMaterial>
        </mesh>
      </Float>

      {/* Background Starfield/Data Particles */}
      <Stars />
      
      {/* 3D Visual Reference Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
         <gridHelper args={[30, 30, "#00ffcc", "#111111"]} />
      </mesh>
      
      {/* Decorative Text */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.15}
        color={hovered ? "#00ffcc" : "#white"}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/robotomono/v12/L0tkP45N8gbI-716xCHxZkBTLeGZSMdfm62V07v_ug.woff"
        fillOpacity={0.8}
      >
        {"[ CLICK_CORE_TO_ACTIVATE ]"}
      </Text>
    </group>
  );
}

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}
