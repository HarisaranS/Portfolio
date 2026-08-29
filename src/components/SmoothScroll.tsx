'use client';

import React, { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  const resizePageHeight = useCallback(() => {
    if (scrollRef.current) {
      setPageHeight(scrollRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    resizePageHeight();
    window.addEventListener('resize', resizePageHeight);
    // Add a mutation observer to catch DOM changes
    const observer = new MutationObserver(resizePageHeight);
    if (scrollRef.current) {
      observer.observe(scrollRef.current, { childList: true, subtree: true, attributes: true });
    }
    return () => {
      window.removeEventListener('resize', resizePageHeight);
      observer.disconnect();
    };
  }, [resizePageHeight]);

  const { scrollY } = useScroll();
  const smoothProgress = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });
  
  const y = useTransform(smoothProgress, (value) => {
    return `-${value}px`;
  });

  return (
    <>
      <div style={{ height: pageHeight }} />
      <motion.div
        ref={scrollRef}
        style={{ y, position: 'fixed', top: 0, left: 0, width: '100%', overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </>
  );
};
