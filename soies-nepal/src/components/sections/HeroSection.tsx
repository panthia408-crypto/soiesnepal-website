"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image — always use local team photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/team_2081.jpeg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated particles/decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gold-300 rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-navy-400 rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/15 text-white border border-white/30 backdrop-blur-sm">
              Est. Since 2062 B.S.
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">SOIES</span>{" "}
            <span className="text-white">Nepal</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-navy-200 font-light mb-3 max-w-2xl mx-auto"
          >
            Society of Industrial Engineering Students
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm sm:text-base text-navy-300 mb-10 max-w-xl mx-auto"
          >
            Empowering Industrial Engineering for Nepal&apos;s Future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#about"
              className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40"
            >
              Discover More
            </a>
            <a
              href="#events"
              className="px-8 py-3.5 border border-navy-400/50 text-navy-200 font-medium rounded-lg hover:bg-navy-800/50 hover:border-gold-500/50 hover:text-gold-400 transition-all"
            >
              View Events
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8"
        >
          <a href="#about" className="flex flex-col items-center text-navy-400 hover:text-gold-400 transition-colors">
            <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
