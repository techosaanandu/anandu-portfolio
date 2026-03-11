"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import TechCloud from "./canvas/TechCloud";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function TechSection() {
  return (
    <section id="techstack" className="relative h-screen w-full flex flex-col justify-center items-center pt-40 pb-20 px-6 overflow-hidden">
      {/* Massive Background Outlined Typography */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-[35%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0"
      >
        <h2
          className="text-[18vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-20 select-none animate-pulse"
          style={{ WebkitTextStroke: '2px rgba(45, 212, 191, 0.5)' }}
        >
          SYSTEM
        </h2>
        <h2
          className="text-[18vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-20 select-none"
          style={{ WebkitTextStroke: '2px rgba(99, 102, 241, 0.5)' }}
        >
          CORE
        </h2>
      </motion.div>

      {/* Foreground Glowing Title */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
        className="z-10 text-center mb-8 pointer-events-none mt-10"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-[0.2em] uppercase relative inline-block">
          <span className="absolute -inset-2 blur-2xl bg-linear-to-r from-teal-500/40 to-indigo-500/40 opacity-70"></span>
          <span className="relative text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-500">
            THE ENGINE
          </span>
        </h2>
        {/* <div className="h-1 w-32 bg-linear-to-r from-teal-400 to-indigo-500 mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.8)]"></div> */}
      </motion.div>

      {/* 3D Tech Container - Full View */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#00ffcc" />
          <pointLight position={[-15, -15, -15]} intensity={0.5} color="#aa00ff" />
          <Suspense fallback={null}>
            <TechCloud />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-teal-900/10 blur-[100px] -z-10 pointer-events-none"></div>
    </section>
  );
}
