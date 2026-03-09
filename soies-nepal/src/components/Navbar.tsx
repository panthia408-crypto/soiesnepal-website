"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const topLinks = [
  { href: "/library", label: "Library" },
  { href: "/journal", label: "Journal" },
  { href: "/magazine", label: "Magazine" },
  { href: "/notices", label: "Notices" },
];

const topRightLinks = [
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Secondary Bar — NOT sticky, scrolls away */}
      <div className="bg-slate-100 dark:bg-navy-950/90 border-b border-slate-200 dark:border-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9 text-xs">
          <div className="hidden sm:flex items-center gap-4">
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-navy-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-4">
            {topRightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-navy-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar — sticky */}
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-navy-950/50 border-b border-slate-200/80 dark:border-navy-700/30"
            : "bg-white/80 dark:bg-navy-900/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/soies.svg"
              alt="SOIES Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-slate-900 dark:text-white font-semibold text-sm leading-tight">
                Society of Industrial Engineering
              </p>
              <p className="text-slate-500 dark:text-navy-300 text-xs">
                Students - SOIES Nepal
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-700 dark:text-navy-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-400 group-hover:w-2/3 transition-all duration-300" />
              </Link>
            ))}
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-4 p-2 rounded-lg bg-slate-100 dark:bg-navy-800/50 text-slate-600 dark:text-navy-300 hover:text-gold-500 dark:hover:text-gold-400 hover:bg-slate-200 dark:hover:bg-navy-800 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-navy-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-[64px] z-40 bg-white/98 dark:bg-navy-950/98 backdrop-blur-xl md:hidden"
          >
            <div className="p-6 space-y-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-lg font-medium text-slate-700 dark:text-navy-200 hover:text-gold-500 dark:hover:text-gold-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-slate-200 dark:border-navy-800 my-4" />
              {[...topLinks, ...topRightLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-slate-600 dark:text-navy-300 hover:text-gold-500 dark:hover:text-gold-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 dark:text-navy-300 hover:text-gold-500 dark:hover:text-gold-400"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
