"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24">
      {/* Main Content Container */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Left: Git Bash Terminal Styled Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-[#0c0c0c]/90 rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl group"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-white/5 select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-500 font-bold">git-bash — 80x24</div>
            <div className="w-12"></div> {/* Spacer for balance */}
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed overflow-hidden">
            <div className="flex flex-col gap-4">
              {/* Command Line */}
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold shrink-0">user@anandu:~$</span>
                <span className="text-white font-bold italic">cat whoami.txt</span>
              </div>

              {/* Typewriter Output */}
              <div className="text-gray-300 space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  I am a multidisciplinary <strong className="font-semibold text-teal-300">Full-Stack Developer</strong> driven by a passion for bridging the gap between heavy engineering and high-end design.
                </motion.p>

                {/* <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  My expertise lies in building scalable modern backend architectures while rendering fluid, interactive 3D web experiences on the front end. I don't just build websites; I craft digital ecosystems engineered for peak performance.
                </motion.p> */}
              </div>

              {/* Experience Command */}
              <motion.div
                className="flex flex-col gap-4 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold shrink-0">user@anandu:~$</span>
                  <span className="text-white font-bold italic">cat experience.txt</span>
                </div>

                <div className="text-gray-300 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-teal-500/30 pl-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">[ SUCCESS ]</span>
                      <h4 className="text-teal-300 font-bold uppercase tracking-widest text-xs">Mission: Techosa</h4>
                    </div>

                    <p className="text-white font-bold tracking-tight">
                      <span className="text-gray-500 mr-2">ROLE:</span>
                      SOFTWARE_ENGINEER <span className="text-indigo-400">@ ROBOTICS_DIV</span>
                    </p>

                    <div className="text-sm opacity-90 font-mono leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-teal-400">{"> "}</span>
                      Deploying smart ecosystems using
                      <span className="text-indigo-300"> Arduino</span>,
                      <span className="text-indigo-300"> Raspberry_Pi</span>,
                      <span className="text-indigo-300"> NodeMCU</span>, and
                      <span className="text-teal-300"> Sensors</span>
                      to bridge the mechanical-digital void.
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Cursor/Next Prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="flex items-center gap-2"
              >
                <span className="text-teal-400 font-bold">user@anandu:~$</span>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-5 bg-teal-400"
                ></motion.div>
              </motion.div>
            </div>

            {/* Matrix-like Background Grain or Subtle Accent */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500/5 blur-[100px] pointer-events-none rounded-full group-hover:bg-teal-500/10 transition-colors duration-700"></div>
          </div>
        </motion.div>

        {/* Right: AR Image Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center p-4 group"
        >
          <div className="relative">
            <motion.img
              src="/aaa.webp"
              alt="Robotics Board Schematic"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 max-w-full h-auto rounded-2xl shadow-2xl brightness-110 filter "
            />

            {/* Technical Detail Corner Card */}
            <div className="absolute -bottom-6 -right-6 glass p-4 rounded-xl border border-white/10 hidden md:block z-20">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono text-teal-400 tracking-[0.2em] uppercase">Status: linked</span>
                <div className="h-0.5 w-full bg-teal-500/20 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-teal-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
