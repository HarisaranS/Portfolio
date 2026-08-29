'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, THEMES, ThemeType } from '@/store/portfolioStore';
import { Search, Command, X, Shield, Terminal, Folder, Award, Mail, Palette, ArrowRight } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { theme, setThemeWithOrigin, setActiveSection } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Keyboard shortcut: ⌘ K or Ctrl K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const COMMAND_ITEMS = [
    {
      category: 'Navigation',
      items: [
        { id: 'hero', title: 'Go to Hero Overview', icon: Terminal, action: () => { window.location.hash = '#hero'; setActiveSection('hero'); setOpen(false); } },
        { id: 'skills', title: 'View Technical Arsenal', icon: Shield, action: () => { window.location.hash = '#skills'; setActiveSection('skills'); setOpen(false); } },
        { id: 'projects', title: 'Explore Featured Projects', icon: Folder, action: () => { window.location.hash = '#projects'; setActiveSection('projects'); setOpen(false); } },
        { id: 'experience', title: 'View Education & Experience', icon: Terminal, action: () => { window.location.hash = '#experience'; setActiveSection('experience'); setOpen(false); } },
        { id: 'certifications', title: 'View Certifications', icon: Award, action: () => { window.location.hash = '#certifications'; setActiveSection('certifications'); setOpen(false); } },
        { id: 'contact', title: 'Contact Candidate', icon: Mail, action: () => { window.location.hash = '#contact'; setActiveSection('contact'); setOpen(false); } },
      ],
    },
    {
      category: 'Themes',
      items: [
        { id: 'clean', title: 'Switch Theme: Clean White (Pristine Default)', icon: Palette, action: () => { setThemeWithOrigin('clean', { x: window.innerWidth / 2, y: 40 }); setOpen(false); } },
        { id: 'slate', title: 'Switch Theme: Minimal Slate', icon: Palette, action: () => { setThemeWithOrigin('slate', { x: window.innerWidth / 2, y: 40 }); setOpen(false); } },
        { id: 'emerald', title: 'Switch Theme: Emerald Studio', icon: Palette, action: () => { setThemeWithOrigin('emerald', { x: window.innerWidth / 2, y: 40 }); setOpen(false); } },
        { id: 'midnight', title: 'Switch Theme: Midnight Luxury', icon: Palette, action: () => { setThemeWithOrigin('midnight', { x: window.innerWidth / 2, y: 40 }); setOpen(false); } },
      ],
    },
    {
      category: 'Recruitment & Quick Actions',
      items: [
        { id: 'email', title: 'Copy Candidate Email (harisaran777s@gmail.com)', icon: Mail, action: () => { navigator.clipboard.writeText('harisaran777s@gmail.com'); alert('Email copied to clipboard!'); setOpen(false); } },
        { id: 'phone', title: 'Call Candidate (+91 6385428704)', icon: Mail, action: () => { window.location.href = 'tel:+916385428704'; setOpen(false); } },
      ],
    },
  ];

  const filteredCategories = COMMAND_ITEMS.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.items.length > 0);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9000] flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md"
            />

            {/* Command Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl rounded-3xl glass-header border shadow-2xl overflow-hidden z-10 font-mono text-xs"
              style={{
                backgroundColor: t.isDark ? '#12141d' : '#ffffff',
                borderColor: t.border,
              }}
            >
              {/* Search Bar Input */}
              <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: t.border }}>
                <Search className="w-4 h-4" style={{ color: t.textMuted }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search section (e.g. 'projects', 'theme', 'email')..."
                  className="flex-1 bg-transparent outline-none text-xs font-mono"
                  style={{ color: t.textPrimary }}
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-bold"
                  style={{ color: t.textMuted }}
                >
                  ESC
                </button>
              </div>

              {/* Items List */}
              <div className="p-2 max-h-[360px] overflow-y-auto space-y-4">
                {filteredCategories.length === 0 ? (
                  <div className="p-6 text-center text-xs" style={{ color: t.textMuted }}>
                    No matching commands found for "{search}"
                  </div>
                ) : (
                  filteredCategories.map((cat) => (
                    <div key={cat.category}>
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: t.textMuted }}>
                        {cat.category}
                      </div>
                      <div className="space-y-1 mt-1">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={item.action}
                            className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors group text-left"
                            style={{ color: t.textPrimary }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = t.isDark
                                ? 'rgba(255, 255, 255, 0.08)'
                                : 'rgba(15, 23, 42, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-4 h-4" style={{ color: t.accentSecondary }} />
                              <span className="font-medium text-xs">{item.title}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: t.accentSecondary }} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t flex items-center justify-between text-[10px]" style={{ borderColor: t.border, color: t.textMuted }}>
                <span>Use Arrow keys or Click to select</span>
                <span>⌘ K / ESC</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
