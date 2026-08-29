'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const StickySection = ({ children, zIndex }: { children: React.ReactNode, zIndex: number }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of THIS specific section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // As the user scrolls past this section, scale it down slightly and dim it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={targetRef} className="h-screen w-full sticky top-0" style={{ zIndex }}>
      <motion.div 
        style={{ scale, opacity, filter }} 
        className="h-full w-full origin-top relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};
