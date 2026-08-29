'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, ExternalLink } from 'lucide-react';

const CERTS = [
  { id: 'ejpt', abbr: 'eJPT', full: 'eLearnSecurity Junior\nPenetration Tester', issuer: 'INE Security', year: '2025', status: 'Active', color: '#dc2626', rotate: -2.5 },
  { id: 'secplus', abbr: 'Sec+', full: 'CompTIA Security+', issuer: 'CompTIA', year: '2024', status: 'Active', color: '#ea580c', rotate: 1.8 },
  { id: 'apisec', abbr: 'API', full: 'API Security\nPractitioner', issuer: 'APISec University', year: '2024', status: 'Active', color: '#9333ea', rotate: -1.2 },
  { id: 'nde', abbr: 'NDE', full: 'Network Defense\nEssentials', issuer: 'EC-Council', year: '2023', status: 'Active', color: '#16a34a', rotate: 2.1 },
  { id: 'aws', abbr: 'AWS', full: 'AWS Certified\nCloud Practitioner', issuer: 'Amazon Web Services', year: '2024', status: 'Active', color: '#d97706', rotate: -1.5 },
  { id: 'crest', abbr: 'CPSA', full: 'CREST Practitioner\nSecurity Analyst', issuer: 'CREST', year: '2026', status: 'In Progress', color: '#0284c7', rotate: 1.0 },
];

const PolaroidCard: React.FC<{ cert: typeof CERTS[0]; idx: number }> = ({ cert, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: cert.rotate * 0.5, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, rotate: cert.rotate, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: idx * 0.1 }}
      whileHover={{
        rotate: 0,
        scale: 1.06,
        y: -12,
        zIndex: 20,
        transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
      }}
      className="relative cursor-pointer"
      style={{ zIndex: 1 }}
    >
      {/* Polaroid frame */}
      <div
        className="bg-white shadow-xl"
        style={{
          padding: '16px 16px 52px 16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Photo area — abstract colored block */}
        <div
          className="w-full mb-0 flex items-center justify-center overflow-hidden"
          style={{
            height: '140px',
            background: `linear-gradient(135deg, ${cert.color}18 0%, ${cert.color}30 50%, ${cert.color}10 100%)`,
            borderBottom: `3px solid ${cert.color}`,
          }}
        >
          {/* Abbr as the "photo content" */}
          <span
            className="font-syne font-black text-center select-none"
            style={{
              fontSize: 'clamp(42px, 7vw, 64px)',
              letterSpacing: '-0.04em',
              color: cert.color,
              opacity: 0.9,
            }}
          >
            {cert.abbr}
          </span>
        </div>

        {/* Polaroid caption area */}
        <div className="pt-4 px-1">
          <div className="font-mono text-[10px] text-zinc-400 mb-1 leading-snug whitespace-pre-line">
            {cert.full}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-mono text-[9px] text-zinc-400">{cert.issuer}</span>
            <div className="flex items-center gap-1">
              {cert.status === 'Active'
                ? <ShieldCheck className="w-3 h-3" style={{ color: cert.color }} />
                : <Clock className="w-3 h-3 text-zinc-400" />}
              <span className="font-mono text-[9px]" style={{ color: cert.status === 'Active' ? cert.color : '#71717a' }}>
                {cert.year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pin at top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-md border-2 border-white z-10"
        style={{ backgroundColor: cert.color }}
      />
    </motion.div>
  );
};

export const CertsSection: React.FC = () => {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section
      id="certifications"
      className="pt-24 pb-20 relative overflow-hidden"
      style={{
        backgroundColor: '#faf9f7',
        borderTop: '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        backgroundImage: `radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── Header ── */}
      <div ref={headRef} className="px-6 md:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">06 / Certifications</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-syne font-black text-black uppercase leading-none"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.03em' }}>
              Credentials<br />Wall
            </h2>
            <p className="text-sm text-zinc-400 max-w-[220px] md:pb-4 leading-relaxed font-mono">
              Hover any card to straighten and enlarge it
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Polaroid wall grid ── */}
      <div className="px-6 md:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
           style={{ perspective: '1200px' }}>
        {CERTS.map((c, i) => (
          <PolaroidCard key={c.id} cert={c} idx={i} />
        ))}
      </div>
    </section>
  );
};
