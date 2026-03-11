"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ExternalLink, Github } from "lucide-react";
import ProjectCardBg from "./canvas/ProjectCardBg";

const projects = [
  {
    title: "Quantum E-Commerce",
    description: "A high-performance storefront with Next.js, Stripe, and Three.js 3D product previews.",
    tech: ["Next.js", "Three.js", "Tailwind", "Stripe"],
    color: "from-purple-500 to-indigo-500",
    id: 0,
    tag: "E-Commerce"
  },
  {
    title: "Omni-Dash",
    description: "Enterprise level analytics platform using React, D3.js, Node and MongoDB for real-time data.",
    tech: ["React", "Express", "D3.js", "MongoDB"],
    color: "from-teal-400 to-emerald-500",
    id: 1,
    tag: "Analytics"
  },
  {
    title: "Neura-Chat",
    description: "AI-powered real-time messaging application with sentiment analysis and translation features.",
    tech: ["Supabase", "React", "OpenAI", "Socket.io"],
    color: "from-blue-500 to-cyan-500",
    id: 2,
    tag: "AI / SaaS"
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="projects" ref={containerRef} className="py-32 w-full overflow-hidden relative min-h-screen bg-[#030303]">
      {/* Massive Background Outlined Typography */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-[20%] md:top-[15%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0"
      >
        <h2 
          className="text-[18vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-20 select-none animate-pulse" 
          style={{ WebkitTextStroke: '2px rgba(99, 102, 241, 0.5)' }}
        >
          LATEST
        </h2>
        <h2 
          className="text-[18vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-20 select-none" 
          style={{ WebkitTextStroke: '2px rgba(45, 212, 191, 0.5)' }}
        >
          WORKS
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 mb-24 mt-16 relative z-10 flex flex-col items-center">
        {/* Foreground Glowing Title */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="text-center pointer-events-none"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-[0.2em] uppercase relative inline-block">
            <span className="absolute -inset-2 blur-2xl bg-linear-to-r from-indigo-500/40 to-teal-500/40 opacity-70"></span>
            <span className="relative text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-500">
              DEPLOYMENTS
            </span>
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-indigo-500 to-teal-400 mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.8)]"></div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-6 font-light text-lg tracking-wider uppercase text-center"
        >
          Scroll to explore projects
        </motion.p>
      </div>

      {/* Horizontal Carousel area */}
      <motion.div 
        style={{ x: xTransform }} 
        className="flex gap-12 px-6 md:px-20 min-w-max pb-20"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-[320px] md:w-[500px] shrink-0"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="32px"
              scale={1.05}
              transitionSpeed={1500}
            >
              <div className="h-[500px] p-10 rounded-[32px] glass backdrop-blur-3xl border border-white/5 relative overflow-hidden group flex flex-col justify-between">
                
                {/* 3D Holographic Background */}
                <ProjectCardBg index={project.id} />

                {/* Overlays / Accents */}
                <div className={`absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500`}>
                   <span className="text-[10px] font-mono tracking-widest uppercase text-white border border-white/20 px-3 py-1 rounded-full">
                      {project.tag}
                   </span>
                </div>

                <div className="relative z-10 w-full mb-auto mt-4 px-2">
                  <h3 className="text-4xl font-black text-white mb-2 leading-none tracking-tighter drop-shadow-2xl">
                    {project.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx === 1 ? "text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-500 block" : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </h3>
                  <div className="h-[2px] w-12 bg-teal-400 mt-4 group-hover:w-full transition-all duration-700"></div>
                </div>
                
                <div className="relative z-10 px-2">
                  <p className="text-gray-400 mb-8 font-light text-sm md:text-base leading-relaxed h-[3em] overflow-hidden">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-widest py-1 border-b border-white/10 text-gray-500 font-bold group-hover:text-teal-400 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href="#" className="flex-1 py-4 glass border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-bold tracking-widest uppercase text-xs">
                      <Github size={18} /> Source
                    </a>
                    <a href="#" className="flex-1 py-4 bg-white text-black rounded-2xl flex items-center justify-center gap-3 hover:opacity-80 transition-all font-bold tracking-widest uppercase text-xs">
                      <ExternalLink size={18} /> Demo
                    </a>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-white/5 to-transparent -mr-12 -mb-12 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>

      {/* Back glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-indigo-900/10 blur-[100px] -z-10 pointer-events-none"></div>
    </section>
  );
}
