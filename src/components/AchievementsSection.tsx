'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Scoreboard Achievements ─── */

const RANKS = [
  { rank: '#01', label: 'TryHackMe', value: 'Top 1%', desc: 'Global leaderboard · 800K+ users', badge: 'ELITE', color: '#dc2626', glow: '#dc262640' },
  { rank: '#02', label: 'CREST Competition', value: '1st Place', desc: 'National penetration testing championship', badge: 'GOLD', color: '#d97706', glow: '#d9770640' },
  { rank: '#03', label: 'Skillrack Platform', value: '1,290+', desc: 'Problems solved · Top contributor', badge: 'PRO', color: '#2563eb', glow: '#2563eb40' },
  { rank: '#04', label: 'LeetCode DSA', value: '230+', desc: 'Algorithm & data structures solved', badge: 'ACE', color: '#7c3aed', glow: '#7c3aed40' },
  { rank: '#05', label: 'Bug Bounty HoF', value: '3× Listed', desc: 'Hall of Fame — responsible disclosure', badge: 'LISTED', color: '#059669', glow: '#05966940' },
  { rank: '#06', label: 'Axios CTF', value: '1st Place', desc: 'Capture The Flag — regional finals', badge: 'WINNER', color: '#0891b2', glow: '#0891b240' },
];

const ScoreRow: React.FC<{ item: typeof RANKS[0]; idx: number }> = ({ item, idx }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: idx * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative grid grid-cols-12 items-center gap-4 px-6 md:px-10 py-5 border-b cursor-default transition-colors duration-300"
      style={{
        borderColor: 'rgba(255,255,255,0.05)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
      }}
    >
      {/* Glow line */}
      <motion.div
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 h-[1px] origin-left"
        style={{ backgroundColor: item.color }}
      />

      {/* Rank */}
      <div className="col-span-2">
        <span className="font-syne font-black text-2xl md:text-3xl"
          style={{ color: hovered ? item.color : 'rgba(255,255,255,0.15)', transition: 'color 0.3s' }}>
          {item.rank}
        </span>
      </div>

      {/* Label + desc */}
      <div className="col-span-5">
        <div className="font-syne font-bold text-white text-sm md:text-base mb-0.5">{item.label}</div>
        <div className="font-mono text-[10px] text-white/30 hidden md:block">{item.desc}</div>
      </div>

      {/* Value */}
      <div className="col-span-3">
        <motion.div
          animate={{ color: hovered ? item.color : '#ffffff' }}
          transition={{ duration: 0.3 }}
          className="font-syne font-black text-xl md:text-2xl tabular-nums"
          style={{ letterSpacing: '-0.03em' }}
        >
          {item.value}
        </motion.div>
      </div>

      {/* Badge */}
      <div className="col-span-2 flex justify-end">
        <motion.span
          animate={{
            backgroundColor: hovered ? item.color : 'rgba(255,255,255,0.06)',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.3)',
          }}
          transition={{ duration: 0.3 }}
          className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full font-bold"
        >
          {item.badge}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const AchievementsSection: React.FC = () => {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section id="achievements" style={{ backgroundColor: '#060608', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

      {/* ── Header ── */}
      <div ref={headRef} className="px-6 md:px-12 pt-20 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/20 mb-4">05 / Achievements</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-syne font-black uppercase leading-none text-white"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.03em' }}>
              Leaderboard
            </h2>
            <div className="flex items-center gap-3 md:pb-4">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-2 h-2 rounded-full bg-green-400" />
              <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest">Live Rankings</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Column headers ── */}
      <div className="grid grid-cols-12 gap-4 px-6 md:px-10 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="col-span-2 font-mono text-[9px] uppercase tracking-widest text-white/20">Rank</div>
        <div className="col-span-5 font-mono text-[9px] uppercase tracking-widest text-white/20">Platform / Event</div>
        <div className="col-span-3 font-mono text-[9px] uppercase tracking-widest text-white/20">Score</div>
        <div className="col-span-2 font-mono text-[9px] uppercase tracking-widest text-white/20 text-right">Status</div>
      </div>

      {/* ── Score rows ── */}
      <div>
        {RANKS.map((r, i) => (
          <ScoreRow key={i} item={r} idx={i} />
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="px-6 md:px-12 py-6 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <span className="font-mono text-[10px] text-white/20">Updated: Aug 2026</span>
        <div className="flex items-center gap-6">
          {['ELITE','GOLD','PRO'].map(b => (
            <span key={b} className="font-mono text-[9px] uppercase tracking-widest text-white/20">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
