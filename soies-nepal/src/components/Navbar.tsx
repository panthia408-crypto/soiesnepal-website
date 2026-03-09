"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const upperLinks = [
  { href: "/library", label: "Library" },
  { href: "/journal", label: "Journal" },
  { href: "/magazine", label: "Magazine" },
  { href: "/notices", label: "Notices" },
  { href: "/alumni", label: "Alumni" },
  { href: "/teams", label: "Teams" },
  { href: "/members", label: "Members" },
];

const mainLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#events", label: "Events" },
];

export default function Navbar() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setShowTopBar(currentY < 10 || currentY < lastScrollY);
          setLastScrollY(currentY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const TOP_BAR_H = 36;
  const MAIN_NAV_H = 64;

  return (
    <>
      {/* ── Upper utility bar ───────────────────────────────────────── */}
      <motion.div
        animate={{ y: showTopBar ? 0 : -TOP_BAR_H }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-9 bg-slate-100/95 dark:bg-navy-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-navy-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-0.5 overflow-x-hidden scrollbar-none">
          {upperLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-shrink-0 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded hover:bg-slate-200/60 dark:hover:bg-navy-800/60 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Main navbar ─────────────────────────────────────────────── */}
      <motion.nav
        animate={{ top: showTopBar ? TOP_BAR_H : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 right-0 z-40 h-16 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-navy-700/40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-slate-200 dark:ring-navy-700 group-hover:ring-amber-400 transition-all">
              <img
                src="/soies.svg"
                alt="SOIES Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-semibold text-sm leading-tight">
                Society of Industrial Engineering
              </p>
              <p className="text-slate-500 dark:text-navy-400 text-[11px] leading-tight">
                Students · SOIES Nepal
              </p>
            </div>
          </Link>

          {/* Desktop nav links + theme */}
          <div className="hidden md:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-700 dark:text-navy-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800/50 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200 dark:bg-navy-700 mx-1" />

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800/60 text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-navy-700 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-2 pr-4 relative">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800/60 text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded-lg text-slate-700 dark:text-navy-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 transition-all"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 z-30 bg-white/98 dark:bg-navy-950/98 backdrop-blur-xl md:hidden border-b border-slate-200 dark:border-navy-800/60 shadow-xl"
            style={{ top: showTopBar ? TOP_BAR_H + MAIN_NAV_H : MAIN_NAV_H, height: '100dvh', overflowY: 'auto' }}
            style={{ top: showTopBar ? TOP_BAR_H + MAIN_NAV_H : MAIN_NAV_H }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">

              {/* Main section links */}
              <p className="px-3 pb-1 text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-navy-500">
                Navigation
              </p>
              <div className="space-y-0.5 mb-4">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2.5 text-base font-semibold text-slate-800 dark:text-navy-100 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 dark:bg-navy-800 mx-3 mb-4" />

              {/* Upper bar links in mobile menu */}
              <p className="px-3 pb-1 text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-navy-500">
                Resources
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {upperLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Spacer so page content isn't hidden under navbar ────────── */}
      <div style={{ height: TOP_BAR_H + MAIN_NAV_H }} aria-hidden="true" />
    </>
  );
}