"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import HeroModel from "./canvas/HeroModel";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useRef, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
    >

      {/* Massive Background Typography Parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute z-0 w-full text-center pointer-events-none opacity-5 select-none pt-20"
      >
        <h2 className="text-[25vw] font-black tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
          ANANDU
        </h2>
        <h2 className="text-[25vw] font-black tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
          AJESH
        </h2>
      </motion.div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <HeroModel />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content with Tilt */}
      <motion.div
        animate={{ rotateX: -mousePos.y * 0.5, rotateY: mousePos.x * 0.5 }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="z-10 text-center px-4 perspective-1000 select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 uppercase tracking-[0.5em] text-teal-400 font-black text-xs md:text-sm drop-shadow-[0_0_10px_#00ffcc]"
        >
          {"< SYSTEM_ONLINE />"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-4 leading-[0.85]"
        >
          ANANDU <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-linear-to-r from-white via-teal-400 to-indigo-500 drop-shadow-2xl">AJESH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto uppercase tracking-widest mt-4"
        >
          Creative Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative pointer-events-auto px-10 py-4 rounded-full glass border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"></div>
            <span className="relative z-10 text-xs tracking-[0.4em] uppercase font-black text-white group-hover:text-teal-400 transition-colors">
              Initialize_Core
            </span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-teal-400 group-hover:w-2/3 transition-all duration-500"></div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
