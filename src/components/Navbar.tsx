'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, THEMES, ThemeType } from '@/store/portfolioStore';
import { Menu, X, Palette, Check, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { theme, setThemeWithOrigin, activeSection } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleSelectTheme = (e: React.MouseEvent, themeId: ThemeType) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    setThemeWithOrigin(themeId, { x: clickX, y: clickY });
    setShowThemeMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[5000] px-4 sm:px-8 py-3.5 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Header Glass Capsule */}
        <div
          className="w-full glass-header px-5 py-2.5 rounded-2xl flex items-center justify-between border shadow-lg transition-colors duration-300"
          style={{
            backgroundColor: t.isDark ? 'rgba(18, 20, 29, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: t.border,
          }}
        >
          {/* Brand Mark */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div
              className="w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: t.accent, color: t.isDark ? '#090a0f' : '#ffffff' }}
            >
              HS
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block leading-none" style={{ color: t.textPrimary }}>
                Harisaran S
              </span>
              <span className="text-[10px] font-medium tracking-wide block mt-0.5" style={{ color: t.textMuted }}>
                Cybersecurity Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive ? 'font-bold' : 'hover:opacity-80'
                  }`}
                  style={{
                    color: isActive ? t.textPrimary : t.textMuted,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-xl border shadow-sm"
                      style={{
                        backgroundColor: t.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)',
                        borderColor: t.borderActive,
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Selector + Hire Button */}
          <div className="flex items-center gap-2">
            {/* Theme Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-xl border transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: t.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)',
                  borderColor: t.border,
                  color: t.textPrimary,
                }}
                title="Select Theme"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: t.accentSecondary }} />
                <span className="hidden sm:inline text-[11px] font-mono">{t.name}</span>
              </button>

              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 glass-header rounded-2xl p-2 border shadow-2xl z-[7000]"
                    style={{
                      backgroundColor: t.isDark ? '#12141d' : '#ffffff',
                      borderColor: t.border,
                    }}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider border-b mb-1" style={{ color: t.textMuted, borderColor: t.border }}>
                      Themes (4 Modes)
                    </div>
                    {Object.values(THEMES).map((thm) => (
                      <button
                        key={thm.id}
                        onClick={(e) => handleSelectTheme(e, thm.id as ThemeType)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors"
                        style={{
                          color: theme === thm.id ? t.textPrimary : t.textMuted,
                          backgroundColor: theme === thm.id ? (t.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)') : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: thm.accent }} />
                          <span>{thm.name}</span>
                        </div>
                        {theme === thm.id && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hire Me CTA Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105 shadow-md"
              style={{
                backgroundColor: t.accent,
                color: t.isDark ? '#090a0f' : '#ffffff',
              }}
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border"
              style={{ color: t.textPrimary, borderColor: t.border }}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-6xl mx-auto mt-2 pointer-events-auto overflow-hidden rounded-2xl glass-header border shadow-2xl"
            style={{
              backgroundColor: t.isDark ? 'rgba(18, 20, 29, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: t.border,
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  style={{ color: t.textPrimary }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-xl text-xs font-bold text-center block"
                style={{ backgroundColor: t.accent, color: t.isDark ? '#090a0f' : '#ffffff' }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
