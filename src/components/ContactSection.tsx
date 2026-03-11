"use client";

import { useState, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import NeuralLink from "./canvas/NeuralLink";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = "service_kaslk5m";
    const TEMPLATE_ID = "template_rn07hmk";
    const PUBLIC_KEY = "hAyRORCv1s6_LBfdy";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error("EmailJS Error:", error);
        }
      );
  };

  const handleInput = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  return (
    <section id="contact" className="relative min-h-screen items-center justify-center flex py-32 bg-[#030303] overflow-hidden">
      {/* Massive Background Outlined Typography */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-[20%] md:top-[15%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0"
      >
        <h2
          className="text-[14vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-10 select-none animate-pulse"
          style={{ WebkitTextStroke: '2px rgba(45, 212, 191, 0.4)' }}
        >
          GET IN
        </h2>
        <h2
          className="text-[14vw] font-black tracking-tighter leading-[0.8] text-transparent uppercase opacity-10 select-none"
          style={{ WebkitTextStroke: '2px rgba(99, 102, 241, 0.4)' }}
        >
          TOUCH
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left: Enhanced Glass Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-xl glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#0c0c0c]/50 backdrop-blur-3xl relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-teal-500/30 rounded-tl-[2.5rem]"></div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-500 uppercase">GET_CONNECTED</span>
          </h2>
          <p className="text-gray-400 font-mono text-[10px] tracking-widest uppercase mb-10 opacity-70">
            {status === "success" ? "// Status: TRANSMISSION_COMPLETE" : status === "error" ? "// Status: LINK_FAILED" : "// Status: Awaiting_Input..."}
          </p>

          <form ref={formRef} className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label htmlFor="name" className="text-[10px] font-mono tracking-widest text-teal-400/80 uppercase ml-1">{"[ 01 ] SYSTEM.NAME"}</label>
              <input
                id="name"
                name="user_name"
                required
                autoComplete="off"
                onFocus={handleInput}
                onBlur={handleBlur}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all placeholder:text-gray-700 font-mono text-sm"
                placeholder="identify_yourself"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="email" className="text-[10px] font-mono tracking-widest text-teal-400/80 uppercase ml-1">{"[ 02 ] SYSTEM.CONTACT_VOID"}</label>
              <input
                id="email"
                name="user_email"
                type="email"
                required
                autoComplete="off"
                onFocus={handleInput}
                onBlur={handleBlur}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all placeholder:text-gray-700 font-mono text-sm"
                placeholder="secure_email_endpoint"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="message" className="text-[10px] font-mono tracking-widest text-teal-400/80 uppercase ml-1">{"[ 03 ] SYSTEM.DATA_PAYLOAD"}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                onFocus={handleInput}
                onBlur={handleBlur}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all resize-none placeholder:text-gray-700 font-mono text-sm"
                placeholder="describe_your_mission..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full py-5 mt-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold tracking-[0.5em] transition-all duration-500 uppercase overflow-hidden ${loading ? "opacity-50 cursor-not-allowed" : "hover:border-teal-400/50"}`}
            >
              <span className="relative z-10 group-hover:text-teal-400 transition-colors">
                {loading ? "TRANSFERRING..." : status === "success" ? "UPLOAD_COMPLETE" : status === "error" ? "RETRY_TRANSFER" : "INITIALIZE_TRANSFER"}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-teal-500/10 to-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>

            {status === "success" && (
              <p className="text-teal-400 font-mono text-xs text-center animate-pulse">
                MISSION_COMMUNIQUE: Message sent through the void successfully.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 font-mono text-xs text-center border border-red-400/20 p-2 rounded-lg bg-red-400/5">
                CRITICAL_ERROR: Transmission failed. Check your uplink.
              </p>
            )}
          </form>
        </motion.div>

        {/* Right: Neural Link 3D Interaction */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="h-[500px] lg:h-[800px] w-full relative group bg-white/5 rounded-[4rem]"
        >
          {/* 3D Scene */}
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ height: "100%", width: "100%" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#aa00ff" />
            <Suspense fallback={<mesh><sphereGeometry args={[0.5]} /><meshBasicMaterial color="#00ffcc" wireframe /></mesh>}>
              <NeuralLink isTyping={isTyping} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>

          {/* Aesthetic UI Elements around the 3D model */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[4rem] flex items-center justify-center overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-px bg-linear-to-r from-teal-500/50 to-transparent"></div>
            <div className="absolute bottom-10 right-10 w-32 h-px bg-linear-to-l from-indigo-500/50 to-transparent"></div>

            {/* Circular scanner effect */}
            <div className="w-[80%] aspect-square border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-[60%] aspect-square border border-teal-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full z-20">
            <span className="text-[10px] font-mono text-teal-400 tracking-[0.3em] uppercase animate-pulse shrink-0 whitespace-nowrap">
              {isTyping ? "Neural_Link: ACTIVE" : "Neural_Link: STANDBY_MODE"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
