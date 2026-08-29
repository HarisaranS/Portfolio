'use client';

import { useStore, THEMES } from '@/store/portfolioStore';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ── Theme Ripple ─────────────────────────────── */
export function ThemeRipple() {
  const { theme, themeOrigin } = useStore();
  const t = THEMES[theme];
  const [wave, setWave] = useState<{ id: number; x: number; y: number; color: string } | null>(null);

  useEffect(() => {
    const x = themeOrigin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const y = themeOrigin?.y ?? 40;
    setWave({ id: Date.now(), x, y, color: t.bg });
    const timer = setTimeout(() => setWave(null), 900);
    return () => clearTimeout(timer);
  }, [theme]); // eslint-disable-line

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {wave && (
          <motion.div key={wave.id}
            initial={{ clipPath: `circle(0px at ${wave.x}px ${wave.y}px)` }}
            animate={{ clipPath: `circle(200vmax at ${wave.x}px ${wave.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ clipPath: { duration: 0.75, ease: [0.22,1,.36,1] }, opacity: { duration:.15, delay:.7 } }}
            className="fixed inset-0"
            style={{ backgroundColor: wave.color }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Shimmer Progress Bar ─────────────────────── */
export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const doc = document.documentElement;
      setW((window.scrollY / (doc.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div id="scroll-progress" style={{ width: `${w}%` }} />;
}

/* ── Spotlight Cursor ─────────────────────────── */
export function SpotlightCursor() {
  const { theme } = useStore();
  const t = THEMES[theme];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <div ref={ref} className="spotlight hidden lg:block"
      style={{ background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)` }} />
  );
}

/* ── Canvas Particle Network ──────────────────── */
export function ParticleCanvas() {
  const { theme } = useStore();
  const t = THEMES[theme];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 1,
    }));

    const accentRgb = t.isDark ? '139,92,246' : '99,102,241';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb},.35)`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRgb},${(1 - dist / 120) * .12})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [theme, t.isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
