'use client';

import React, { useEffect, useRef } from 'react';
import { useStore, THEMES } from '@/store/portfolioStore';

export const CustomCursor: React.FC = () => {
  const { theme } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frame = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      frame.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.opacity = '0.85';
        ringRef.current.style.backgroundColor = t.accent + '18';
      }
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.opacity = '0.6';
        ringRef.current.style.backgroundColor = 'transparent';
      }
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', move);
    frame.current = requestAnimationFrame(animate);

    // Attach to all interactive elements
    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(frame.current);
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, [t.accent]);

  return (
    <>
      {/* Inner dot — follows cursor exactly */}
      <div
        ref={dotRef}
        className="fixed z-[99999] pointer-events-none will-change-transform hidden lg:block"
        style={{
          top: '-4px',
          left: '-4px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: t.accent,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Outer ring — lags behind with lerp */}
      <div
        ref={ringRef}
        className="fixed z-[99998] pointer-events-none will-change-transform hidden lg:block"
        style={{
          top: '-18px',
          left: '-18px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: `1.5px solid ${t.accent}`,
          opacity: 0.6,
          transition: 'width 0.3s cubic-bezier(.34,1.56,.64,1), height 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.3s, background-color 0.3s',
        }}
      />
    </>
  );
};
