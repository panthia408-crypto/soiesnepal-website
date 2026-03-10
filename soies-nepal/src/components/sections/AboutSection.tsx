"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Lightbulb, Cog } from "lucide-react";

const initialFacts: string[] = [
  "Industrial Engineering (IE) focuses on optimizing complex systems.",
  "IE at IOE Pulchowk started in the 1960s.",
  "Thapathali Campus is under IOE, TU.",
  "SOIES stands for Society of Industrial Engineering Students.",
  "IE uses tools like Pareto rule, Gantt charts, and Six Sigma.",
  "Subjects include Thermodynamics, Fluid Mechanics, Quality Control.",
  "Nepal introduced IE curriculum in 1961 at Pulchowk.",
  "IOE was established in 1930 by the Nepalese government.",
  "Industrial engineers often work in manufacturing and healthcare.",
  "Thapathali campus is located in central Kathmandu.",
  "IE aims to reduce waste and increase productivity.",
  "SOIES Nepal holds annual conferences and workshops.",
  "IOE is affiliated to Tribhuvan University.",
  "IE graduates can become operations managers or consultants.",
  "IE combines engineering, math, and management principles.",
  "Nepal's first IE department was at Pulchowk Campus.",
  "Thapathali has CAD and other engineering labs.",
  "Many IE students intern at NEA and NOC.",
  "IE plays a role in improving supply chain systems.",
  "Lean manufacturing is a core topic in IE.",
  // extend with more unique facts as desired
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentFact, setCurrentFact] = useState<string | null>(null);

  const factPool = useRef<string[]>([...initialFacts]);

  const generateFact = () => {
    if (factPool.current.length === 0) {
      // refill if exhausted
      factPool.current = [...initialFacts];
    }
    const idx = Math.floor(Math.random() * factPool.current.length);
    const fact = factPool.current.splice(idx, 1)[0];
    return fact;
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Empowering Industrial Engineering for{" "}
              <span className="gradient-text">Nepal&apos;s Future</span>
            </h2>
            <p className="text-slate-600 dark:text-navy-300 text-lg leading-relaxed mb-8">
              At SOIES Nepal, we are dedicated to fostering a vibrant community
              of industrial engineering scholars and professionals. Our mission
              is to enhance efficiency, innovation, and problem-solving within
              Nepal&apos;s industrial sector.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#events"
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold rounded-lg text-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
              >
                Our Events
              </a>
              <a
                href="/teams"
                className="px-6 py-3 border border-slate-300 dark:border-navy-600 text-slate-700 dark:text-navy-200 font-medium rounded-lg text-sm hover:border-gold-500/50 hover:text-gold-500 dark:hover:text-gold-400 transition-all"
              >
                Meet the Team
              </a>
            </div>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To enhance efficiency, innovation, and problem-solving within Nepal's industrial sector.",
                color: "from-gold-500 to-gold-600",
              },
              {
                icon: Lightbulb,
                title: "Our Vision",
                desc: "A vibrant community of industrial engineering scholars driving Nepal's industrial growth.",
                color: "from-navy-500 to-navy-600",
              },
              {
                icon: Cog,
                title: "What We Do",
                desc: "Organize programs, seminars, research publications, and networking opportunities for IE students.",
                color: "from-gold-600 to-gold-700",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 hover:border-gold-500/30 transition-all group card-hover"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          {/* random facts button under features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <button
              onClick={() => {
                setCurrentFact(generateFact());
              }}
              className="px-5 py-2 bg-gold-500 text-white rounded-lg shadow hover:bg-gold-600 transition-colors"
            >
              Random IE Fact
            </button>
            {currentFact && (
              <p className="mt-3 text-sm text-slate-700 dark:text-navy-300">
                💡 {currentFact}
              </p>
            )}
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
