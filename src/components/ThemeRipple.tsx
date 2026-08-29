'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { THEMES } from '@/styles/themes';

interface RippleWave {
  id: number;
  x: number;
  y: number;
  bgColor: string;
}

export const ThemeRipple: React.FC = () => {
  const { theme, themeOrigin } = useOSStore();
  const themeColors = THEMES[theme] || THEMES.black;
  const [waves, setWaves] = useState<RippleWave[]>([]);

  useEffect(() => {
    const x = themeOrigin?.x ?? window.innerWidth / 2;
    const y = themeOrigin?.y ?? 40;

    const newWave: RippleWave = {
      id: Date.now(),
      x,
      y,
      bgColor: themeColors.bg,
    };

    setWaves([newWave]);

    const timer = setTimeout(() => {
      setWaves([]);
    }, 800);

    return () => clearTimeout(timer);
  }, [theme, themeOrigin, themeColors.bg]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {waves.map((w) => (
          <motion.div
            key={w.id}
            initial={{ clipPath: `circle(0px at ${w.x}px ${w.y}px)`, opacity: 1 }}
            animate={{ clipPath: `circle(200vmax at ${w.x}px ${w.y}px)`, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              clipPath: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.15, delay: 0.65 },
            }}
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: w.bgColor }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
