"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { SiNextdotjs, SiNodedotjs, SiMongodb, SiFirebase, SiSupabase, SiPostgresql, SiDocker, SiReact, SiTypescript, SiTailwindcss, SiArduino, SiRaspberrypi, SiEspressif, SiCplusplus } from "react-icons/si";

const techs = [
  { id: 1, name: "Next.js", icon: <SiNextdotjs size={30} /> },
  { id: 2, name: "Node.js", icon: <SiNodedotjs size={30} /> },
  { id: 3, name: "Arduino", icon: <SiArduino size={30} /> },
  { id: 4, name: "Raspberry Pi", icon: <SiRaspberrypi size={30} /> },
  { id: 5, name: "NodeMCU", icon: <SiEspressif size={30} /> },
  { id: 6, name: "Sensors", icon: <SiCplusplus size={30} /> },
  { id: 7, name: "TypeScript", icon: <SiTypescript size={30} /> },
  { id: 8, name: "React", icon: <SiReact size={30} /> },
  { id: 9, name: "Docker", icon: <SiDocker size={30} /> },
  { id: 10, name: "Tailwind CSS", icon: <SiTailwindcss size={30} /> },
  { id: 11, name: "PostgreSQL", icon: <SiPostgresql size={30} /> },
  { id: 12, name: "MongoDB", icon: <SiMongodb size={30} /> }
];

export default function TechCloud() {
  const group = useRef<THREE.Group>(null);

  // Distribute points on a sphere
  const items = useMemo(() => {
    return techs.map((tech, index) => {
      // golden ratio spiral
      const phi = Math.acos(-1 + (2 * index) / techs.length);
      const theta = Math.sqrt(techs.length * Math.PI) * phi;
      
      const r = 4.2; // Slightly smaller radius for better balance
      return {
        ...tech,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ] as [number, number, number]
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.12;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
      
      // Dynamic scaling for hover effect (using pointer)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.2, 0.1);
    }
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <group key={item.id} position={item.position}>
          {/* Subtle glow sphere behind the icon */}
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#00ffcc" : "#6366f1"} transparent opacity={0.05} />
          </mesh>
          <Html center transform sprite distanceFactor={10} zIndexRange={[100, 0]}>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl glass border border-white/5 hover:border-teal-400 group transition-all duration-500 cursor-pointer select-none">
              <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(0,255,204,0.4)] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-360">
                <span className="text-[#00ffcc] opacity-80 group-hover:opacity-100">
                  {item.icon}
                </span>
              </div>
              <span className="text-[10px] font-black mt-2 text-white/40 tracking-[0.2em] uppercase group-hover:text-teal-400 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {item.name}
              </span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
