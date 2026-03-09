"use client";

import { motion } from "framer-motion";
import { Download, FileText, BookOpen, Pen, Sparkles, Clock } from "lucide-react";

interface Journal {
  _id: string;
  title: string;
  description?: string;
  issueNumber?: number;
  cover?: string | null;
  resources?: string;
}

export default function JournalClient({ journals }: { journals: Journal[] }) {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Publications
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Journal of <span className="gradient-text">Industrial Vision</span>
          </h1>
        </motion.div>

        {journals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-2xl p-10 sm:p-16 text-center"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 border border-gold-500/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-16 -left-16 w-32 h-32 border border-gold-500/10 rounded-full"
              />
              <div className="absolute top-8 left-8 text-gold-500/5">
                <BookOpen size={80} />
              </div>
              <div className="absolute bottom-8 right-8 text-gold-500/5">
                <Pen size={60} />
              </div>
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gold-500/10 dark:bg-gold-500/10 mb-6"
              >
                <Sparkles size={36} className="text-gold-500" />
              </motion.div>

              <h3 className="text-slate-900 dark:text-white font-bold text-2xl sm:text-3xl mb-3">
                Coming Soon
              </h3>
              <p className="text-slate-500 dark:text-navy-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                This section is reserved for future publications by SOIES Nepal.
                When journals are published, they will appear here.
              </p>

              <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400 dark:text-navy-500">
                <Clock size={14} />
                <span>Stay tuned for the launch</span>
              </div>

              {/* Decorative timeline dots */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gold-500"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {journals.map((journal, i) => (
              <motion.div
                key={journal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-xl hover:border-gold-500/30 transition-all card-hover"
              >
                <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-navy-800 flex items-center justify-center shrink-0 overflow-hidden">
                  {journal.cover ? (
                    <img src={journal.cover} alt={journal.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <FileText size={24} className="text-gold-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-slate-900 dark:text-white font-bold">{journal.title}</h4>
                  {journal.description && (
                    <p className="text-slate-500 dark:text-navy-400 text-sm mt-1">
                      {journal.description}
                    </p>
                  )}
                </div>
                {journal.resources && (
                  <a
                    href={journal.resources}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm rounded-lg transition-colors shrink-0"
                  >
                    <Download size={14} /> Download
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
