'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore, THEMES } from '@/store/portfolioStore';

const STRIPES = 5;

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useStore();
  const t = THEMES[theme] || THEMES.clean;

  return (
    <>
      {/* The actual content */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>

      {/* The staggered reveal stripes overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex h-screen w-screen">
        {Array.from({ length: STRIPES }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 origin-top"
            style={{ backgroundColor: t.isDark ? '#090a0f' : '#ffffff' }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1 * i,
            }}
          />
        ))}
      </div>
    </>
  );
};
