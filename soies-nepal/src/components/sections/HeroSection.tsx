"use client";

// Removed framer-motion for performance
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image — always use local team photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/seminar.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* No animated particles or glowing elements */}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div>
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/15 text-white border border-white/30 backdrop-blur-sm">
              Est. Since 2062 B.S.
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">SOIES</span>{" "}
            <span className="text-white">Nepal</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-navy-200 font-light mb-3 max-w-2xl mx-auto">
            Society of Industrial Engineering Students
          </p>

          <p className="text-sm sm:text-base text-navy-300 mb-10 max-w-xl mx-auto">
            Empowering Industrial Engineering for Nepal&apos;s Future
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>

        {/* No scroll indicator */}
      </div>
    </section>
  );
}
