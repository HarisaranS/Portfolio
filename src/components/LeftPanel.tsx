'use client';

import { useStore, THEMES, ThemeType } from '@/store/portfolioStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronRight } from 'lucide-react';
import { ParticleCanvas } from '@/components/effects';

const SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const THEME_CYCLE: ThemeType[] = ['midnight', 'slate', 'clean', 'emerald'];

export function LeftPanel() {
  const { theme, setThemeWithOrigin, activeSection } = useStore();
  const t = THEMES[theme];
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cycleTheme = (e: React.MouseEvent) => {
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setThemeWithOrigin(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <aside className="left-panel relative overflow-hidden" style={{ backgroundColor: t.surface, borderRight: `1px solid ${t.border}` }}>
      {/* Particle background */}
      <div className="absolute inset-0 opacity-40">
        <ParticleCanvas />
      </div>

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-a absolute top-[-10%] left-[-20%] w-64 h-64 rounded-full opacity-25"
          style={{ background: `radial-gradient(circle, ${t.accent}50 0%, transparent 70%)` }} />
        <div className="orb-c absolute bottom-[10%] right-[-20%] w-48 h-48 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${t.accentB}40 0%, transparent 70%)` }} />
      </div>

      <div className="relative z-10 flex flex-col h-full px-7 py-8">
        {/* Terminal prefix */}
        <div className="font-mono text-xs mb-6 flex items-center gap-2" style={{ color: t.muted }}>
          <span style={{ color: t.accent }}>root@</span>
          <span>harisaran-sec</span>
          <span className="animate-pulse" style={{ color: t.accent }}>▮</span>
        </div>

        {/* Identity */}
        <div className="mb-8">
          <h1 className="text-2xl font-black leading-tight mb-1 glitch" data-text="Harisaran S" style={{ color: t.text }}>
            Harisaran S
          </h1>
          <div className="font-mono text-xs mb-4" style={{ color: t.accent }}>
            Cybersecurity Engineer
          </div>
          <p className="text-xs leading-relaxed" style={{ color: t.muted }}>
            B.E CSE (Cybersecurity)<br />
            Sri Eshwar College of Engineering<br />
            2024–2028 · CGPA 8.43
          </p>
        </div>

        {/* Active section nav */}
        <nav className="flex-1 flex flex-col gap-0.5 mb-8">
          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 group"
                style={{
                  backgroundColor: isActive ? t.accent + '18' : 'transparent',
                  color: isActive ? t.accent : t.muted,
                }}
              >
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                  style={{ opacity: isActive ? 1 : .3, color: t.accent }} />
                {s.label}
                {isActive && (
                  <motion.span layoutId="nav-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.accent }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom — socials + clock + theme */}
        <div className="space-y-4">
          {/* Socials row */}
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: 'https://github.com/HarisaranS/' },
              { icon: Linkedin, href: 'https://linkedin.com/in/harisaran-s-a08a1b333' },
              { icon: Mail, href: 'mailto:harisaran777s@gmail.com' },
              { icon: Phone, href: 'tel:+916385428704' },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-2 rounded-lg border transition-all duration-200 hover:scale-110"
                style={{ borderColor: t.border, color: t.muted, backgroundColor: t.surface2 }}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Live clock */}
          <div className="font-mono text-xs px-3 py-2 rounded-lg border"
            style={{ borderColor: t.border, color: t.accent, backgroundColor: t.accent + '0d' }}>
            <span style={{ color: t.muted }}>sys.time  </span>{time}
          </div>

          {/* Theme toggle */}
          <button onClick={cycleTheme}
            className="w-full font-mono text-[11px] px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-[1.02] text-left flex items-center justify-between"
            style={{ borderColor: t.border, color: t.accent, backgroundColor: t.accent + '0d' }}>
            <span style={{ color: t.muted }}>theme </span>
            <span>{t.name} ↺</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
