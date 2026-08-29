'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── Elite Animated Hero ─── */

/* ─── ASCII Matrix Simulation ─── */
const AsciiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CHARS = '·•○◆▲▼◀▶◇□△';
    const SIZE = 22;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let cols = Math.floor(W / SIZE);
    let rows = Math.floor(H / SIZE);
    let cells: { bx: number; by: number; x: number; y: number; c: string; d: number }[] = [];

    const build = () => {
      cols = Math.floor(W / SIZE);
      rows = Math.floor(H / SIZE);
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            bx: c * SIZE + SIZE / 2,
            by: r * SIZE + SIZE / 2,
            x: c * SIZE + SIZE / 2,
            y: r * SIZE + SIZE / 2,
            c: CHARS[Math.floor(Math.random() * CHARS.length)],
            d: Math.random() * 20 + 8,
          });
        }
      }
    };

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      cells.forEach(p => {
        const dx = mouse.current.x - p.bx;
        const dy = mouse.current.y - p.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const R = 160;
        if (dist < R) {
          const f = (R - dist) / R;
          p.x = p.bx - dx / dist * f * p.d;
          p.y = p.by - dy / dist * f * p.d;
          if (Math.random() > 0.92) p.c = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = `rgba(0,0,0,${0.4 + f * 0.5})`;
        } else {
          p.x += (p.bx - p.x) * 0.08;
          p.y += (p.by - p.y) * 0.08;
          ctx.fillStyle = 'rgba(0,0,0,0.07)';
        }
        ctx.font = `${SIZE - 4}px monospace`;
        ctx.fillText(p.c, p.x - SIZE / 2, p.y + SIZE / 2 - 4);
      });
      raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      build();
    };
    const mm = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const ml = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseleave', ml);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseleave', ml);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
    />
  );
};

/* ─── Live Clock ─── */
const LiveClock: React.FC = () => {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs tabular-nums">{t}</span>;
};

/* ─── Hero ─── */
export const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const nameY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-white"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
    >
      <AsciiCanvas />

      {/* ── Top stripe ── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400">
          Portfolio 2026
        </span>
        <LiveClock />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400">
          Coimbatore&nbsp;·&nbsp;IND
        </span>
      </div>

      {/* ── Giant Name ── */}
      <motion.div
        style={{ y: nameY, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-8 pb-0 select-none"
      >
        {/* Massive display heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="font-syne font-black uppercase leading-[0.82] tracking-[-0.04em] text-black"
          style={{ fontSize: 'clamp(72px, 13vw, 210px)' }}
        >
          {['H','A','R','I','S','A','R','A','N'].map((l, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden' }}
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i + 0.2 }}
            >
              {l}
            </motion.span>
          ))}
        </motion.h1>

        {/* Outlined secondary word */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
          className="flex justify-end"
        >
          <h2
            className="font-syne font-black uppercase leading-[0.82] tracking-[-0.04em] text-transparent"
            style={{
              fontSize: 'clamp(72px, 13vw, 210px)',
              WebkitTextStroke: '2px #0a0a0a',
            }}
          >
            SECURITY
          </h2>
        </motion.div>
      </motion.div>

      {/* ── Bottom meta bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 py-8 border-t"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-1">Role</div>
          <div className="text-sm font-semibold text-zinc-800">Cybersecurity Engineer</div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-1">Specialty</div>
          <div className="text-sm font-semibold text-zinc-800">Penetration Testing</div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-1">Rank</div>
          <div className="text-sm font-semibold text-zinc-800">TryHackMe Top 1%</div>
        </div>
        <div className="flex items-end justify-start md:justify-end">
          <motion.a
            href="#projects"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-zinc-800 hover:text-black"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            Scroll
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
