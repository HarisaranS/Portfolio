'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EVENTS = [
  {
    num: '01',
    tag: 'INTERNSHIP',
    year: '2026',
    company: 'Isaii Technologies',
    role: 'Penetration Testing Intern',
    pull: '"Reduced attack surface by 60% across 12 production endpoints."',
    bullets: [
      'Audited REST APIs & web endpoints with OWASP methodology',
      'Decompiled Android APKs with MobSF static analysis',
      'Delivered CVSS-scored executive vulnerability reports',
    ],
    accent: '#2563eb',
  },
  {
    num: '02',
    tag: 'INTERNSHIP',
    year: '2025',
    company: 'CodeAlpha',
    role: 'Cybersecurity Intern',
    pull: '"Automated incident triage cutting response time by 60%."',
    bullets: [
      'Deployed Wazuh SIEM + Velociraptor EDR monitoring pipeline',
      'Built Python-based Nmap correlation & reporting automation',
      'Established incident triage & escalation playbooks',
    ],
    accent: '#7c3aed',
  },
  {
    num: '03',
    tag: 'EDUCATION',
    year: '2024–28',
    company: 'Sri Eshwar College of Engineering',
    role: 'B.E Cybersecurity Engineering',
    pull: '"CGPA 8.43 · CTF Team Leader · Top 10% of cohort."',
    bullets: [
      'Core modules: Network Defense, Cryptography, Malware Analysis',
      'Led CTF team to 3× campus-level victories',
      'Active research in AI-assisted vulnerability discovery',
    ],
    accent: '#16a34a',
  },
];

/* ─── One editorial card ─── */
const EditorialCard: React.FC<{ ev: typeof EVENTS[0]; idx: number }> = ({ ev, idx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: idx * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b"
      style={{ borderColor: 'rgba(0,0,0,0.08)' }}
    >
      {/* ── Left number col ── */}
      <div
        className={`md:col-span-1 flex md:flex-col items-center md:items-start justify-between md:justify-start p-6 md:px-8 md:py-12 border-r ${isEven ? 'md:border-r' : 'md:border-r'}`}
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <span className="font-syne font-black text-zinc-100 leading-none select-none"
          style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.04em' }}>
          {ev.num}
        </span>
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase mt-auto" style={{ color: ev.accent }}>
          {ev.tag}
        </span>
      </div>

      {/* ── Center content ── */}
      <div className="md:col-span-7 p-6 md:px-10 md:py-12">
        {/* Year + company row */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="font-mono text-xs text-zinc-400">{ev.year}</span>
          <span className="w-8 h-[1px] bg-zinc-200" />
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{ev.company}</span>
        </div>

        {/* Role headline */}
        <h3
          className="font-syne font-black text-black mb-6 leading-tight"
          style={{ fontSize: 'clamp(22px, 3.5vw, 44px)', letterSpacing: '-0.025em' }}
        >
          {ev.role}
        </h3>

        {/* Bullets */}
        <ul className="space-y-3">
          {ev.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.4 + i * 0.09 }}
              className="flex items-start gap-3 text-sm text-zinc-500 leading-relaxed"
            >
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ev.accent }} />
              {b}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ── Right pull-quote col ── */}
      <div
        className="md:col-span-4 flex items-center p-6 md:px-8 md:py-12 border-t md:border-t-0 md:border-l"
        style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: '#fafafa' }}
      >
        <blockquote>
          {/* Large opening quote mark */}
          <div
            className="font-syne font-black leading-none mb-2 select-none"
            style={{ fontSize: '72px', color: ev.accent, lineHeight: 1, opacity: 0.2 }}
          >
            "
          </div>
          <p className="font-syne font-bold text-zinc-700 leading-snug italic"
             style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}>
            {ev.pull.replace(/"/g, '')}
          </p>
        </blockquote>
      </div>
    </motion.div>
  );
};

export const TimelineSection: React.FC = () => {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section id="experience" className="bg-white pt-24 pb-0"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>

      {/* ── Header ── */}
      <div ref={headRef} className="px-6 md:px-12 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="pb-12 border-b"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">04 / Experience</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-black text-black uppercase leading-none"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.03em' }}>
              Career<br />Chapters
            </h2>
            <div className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest md:text-right md:pb-4 max-w-[200px]">
              Editorial<br />Format
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Editorial cards ── */}
      <div>
        {EVENTS.map((ev, i) => (
          <EditorialCard key={i} ev={ev} idx={i} />
        ))}
      </div>

      <div className="h-16" />
    </section>
  );
};
