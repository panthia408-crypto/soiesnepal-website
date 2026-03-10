"use client";

// Removed framer-motion for performance
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image — now using next/image for LCP prioritization */}
      <div className="absolute inset-0 scale-105">
        <Image
          src="/seminar.webp"
          alt="SOIES team at a seminar"
          priority
          fill
          className="object-cover object-center"
        />
      </div>

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
            <a
              href="https://discord.gg/CaKVvnE9z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Discord server"
              className="px-8 py-3.5 bg-[#5865F2] text-white font-bold rounded-lg shadow-lg hover:bg-[#4752c4] transition-all flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#5865F2"/><path d="M24.5 21.167c-1.167.5-2.417.833-3.75 1.083-.333-.5-.667-1.083-.917-1.583 1.75-.25 3.333-.667 4.75-1.25.083.583.083 1.167-.083 1.75zm-13 1.083c-1.333-.25-2.583-.583-3.75-1.083-.167-.583-.167-1.167-.083-1.75 1.417.583 3 .917 4.75 1.25-.25.5-.583 1.083-.917 1.583zm10.083-2.083c-2.083.333-4.25.333-6.333 0-.25-.5-.5-1.083-.667-1.667 2.25.333 4.5.333 6.75 0-.167.584-.417 1.167-.75 1.667zm-8.25-2.25c-2.083-.5-3.917-1.25-5.25-2.167.25-1.167.833-2.25 1.667-3.167 1.25.917 2.833 1.667 4.75 2.167-.25.667-.417 1.334-.417 2.167zm13.334-2.167c.834.917 1.417 2 1.667 3.167-1.333.917-3.167 1.667-5.25 2.167 0-.833-.167-1.5-.417-2.167 1.917-.5 3.5-1.25 4.75-2.167zm-6.667-1.167c-2.25-.333-4.417-.917-6.25-1.75.25-.917.667-1.75 1.25-2.5 1.667.75 3.75 1.25 6 1.5-.083.667-.167 1.334-.167 2.25zm8.25-1.75c.583.75 1 1.583 1.25 2.5-1.833.833-4 1.417-6.25 1.75 0-.916-.083-1.583-.167-2.25 2.25-.25 4.333-.75 6-1.5zm-7.25-1.083c-2.083-.25-4.083-.75-5.75-1.5.5-.833 1.167-1.583 2-2.167 1.5.667 3.25 1.083 5 1.25-.083.5-.167 1.083-.25 1.417zm8.5-1.5c.833.584 1.5 1.334 2 2.167-1.667.75-3.667 1.25-5.75 1.5-.083-.334-.167-.917-.25-1.417 1.75-.167 3.5-.583 5-1.25z" fill="#fff"/></svg>
              Join Interactive Learning
            </a>
          </div>
        </div>

        {/* No scroll indicator */}
      </div>
    </section>
  );
}
