"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, X, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  rank?: number;
  description?: string;
  photoUrl?: string | null;
  committee?: string;
}

function MemberCard({
  member,
  featured = false,
  delay = 0,
  onClick,
}: {
  member: TeamMember;
  featured?: boolean;
  delay?: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
        featured
          ? "border-2 border-gold-500/50 shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/20 hover:border-gold-500/70"
          : "border border-slate-200 dark:border-navy-700/50 shadow-lg hover:border-gold-500/40 hover:shadow-xl"
      }`}
    >
      {/* Photo */}
      <div className="aspect-[3/4] relative bg-gradient-to-br from-navy-800 to-navy-900">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
            <User size={featured ? 72 : 48} className="text-slate-300 dark:text-navy-700" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-1 ${
          featured ? "text-gold-400" : "text-gold-400/70"
        }`}>
          {member.position}
        </p>
        <h3 className={`text-white font-bold leading-snug ${featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
}

function ProfilePopup({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 dark:border-navy-700 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="aspect-square relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={80} className="text-slate-300 dark:text-navy-700" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-1">
            {member.position}
          </p>
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">
            {member.name}
          </h3>
          {member.description && (
            <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed mt-3">
              {member.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamsClient({ team }: { team: TeamMember[] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Group members by committee
  const committeeMap = new Map<string, TeamMember[]>();
  for (const member of team) {
    const key = member.committee || "18th Executive Committee";
    if (!committeeMap.has(key)) committeeMap.set(key, []);
    committeeMap.get(key)!.push(member);
  }

  // Sort committees: extract number, highest first (latest committee first)
  const committees = [...committeeMap.keys()].sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numB - numA;
  });

  const [activeCommittee, setActiveCommittee] = useState(committees[0] || "18th Executive Committee");
  const members = committeeMap.get(activeCommittee) || [];

  // Use rank to determine rows
  const sorted = [...members].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const president = sorted.find((m) => m.rank === 1);
  const vp = sorted.find((m) => m.rank === 2);
  const secretary = sorted.find((m) => m.rank === 3);
  const row2 = sorted.filter((m) => m.rank && m.rank >= 4 && m.rank <= 7);
  const row3 = sorted.filter((m) => !m.rank || m.rank >= 8);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-16 sm:py-20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            <Shield size={12} />
            Our People
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            <span className="gradient-text">Executive</span> Committee
          </h1>
          <p className="text-slate-500 dark:text-navy-300 mt-4 max-w-lg mx-auto">
            The dedicated individuals driving SOIES Nepal forward.
          </p>
        </motion.div>

        {/* Committee Tabs */}
        {committees.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          >
            {committees.map((name) => (
              <button
                key={name}
                onClick={() => setActiveCommittee(name)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCommittee === name
                    ? "text-white shadow-lg"
                    : "text-slate-500 dark:text-navy-400 bg-slate-100 dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700 hover:border-gold-500/40 hover:text-slate-700 dark:hover:text-navy-200"
                }`}
              >
                {activeCommittee === name && (
                  <motion.span
                    layoutId="committeeTab"
                    className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Single committee - show name as subtitle */}
        {committees.length === 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gold-500 dark:text-gold-400 font-semibold tracking-wide text-sm uppercase mb-12"
          >
            {committees[0]}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCommittee}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Row 1: VP — President (featured) — Secretary */}
            <div className="mb-10 sm:mb-14">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto items-end">
                {/* VP */}
                <div className="order-2 sm:order-1 self-end">
                  {vp && <MemberCard member={vp} delay={0.15} onClick={() => setSelectedMember(vp)} />}
                </div>
                {/* President — spans full width on mobile */}
                <div className="order-1 sm:order-2 col-span-2 sm:col-span-1 self-start sm:-mt-4 max-w-[280px] sm:max-w-none mx-auto w-full">
                  {president && <MemberCard member={president} featured delay={0} onClick={() => setSelectedMember(president)} />}
                </div>
                {/* Secretary */}
                <div className="order-3 self-end">
                  {secretary && <MemberCard member={secretary} delay={0.15} onClick={() => setSelectedMember(secretary)} />}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            {row2.length > 0 && (
              <div className="mb-10 sm:mb-14">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto">
                  {row2.map((member, i) => (
                    <div key={member._id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(20%-1rem)]">
                      <MemberCard member={member} delay={0.25 + i * 0.08} onClick={() => setSelectedMember(member)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 3: Remaining members */}
            {row3.length > 0 && (
              <div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-4xl mx-auto">
                  {row3.map((member, i) => (
                    <div key={member._id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(25%-0.9375rem)]">
                      <MemberCard member={member} delay={0.4 + i * 0.06} onClick={() => setSelectedMember(member)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Profile popup */}
      <AnimatePresence>
        {selectedMember && (
          <ProfilePopup member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}