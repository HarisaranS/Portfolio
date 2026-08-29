'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, THEMES } from '@/store/portfolioStore';

const WORDS = [
  'Security',
  'Engineering',
  'Design',
  'Architecture',
  'Intelligence'
];

export const Preloader: React.FC = () => {
  const { theme } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index === WORDS.length - 1) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 800 : 250);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: t.isDark ? '#090a0f' : '#ffffff' }}
        >
          {/* Top splitting door */}
          <motion.div
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-[50%]"
            style={{ backgroundColor: t.isDark ? '#090a0f' : '#ffffff' }}
          />

          {/* Bottom splitting door */}
          <motion.div
            exit={{ y: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-[50%]"
            style={{ backgroundColor: t.isDark ? '#090a0f' : '#ffffff' }}
          />

          {/* Central Loader Content */}
          <div className="relative z-10 flex items-center justify-center overflow-hidden h-20">
            <motion.div
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.accent }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="text-4xl md:text-5xl font-black tracking-tighter"
                  style={{ color: t.textPrimary }}
                >
                  {WORDS[index]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            exit={{ opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] uppercase"
            style={{ color: t.textMuted }}
          >
            Harisaran S © 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
