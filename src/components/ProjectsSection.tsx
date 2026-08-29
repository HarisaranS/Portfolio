'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    num: '01',
    title: 'AEGIS SHIELD',
    category: 'SOC Automation',
    year: '2025',
    tech: ['Go', 'Wazuh', 'EDR', 'SOAR'],
    color: '#2563eb',
    logs: ['› Telemetry ingested via Wazuh agent', '› Threat score: 0.94 (CRITICAL)', '› Isolation playbook executed in 340ms', '› Alert dispatched to SIEM dashboard'],
    desc: 'An intelligent SOC automation platform that ingests live telemetry, scores threats, and executes isolation playbooks autonomously.',
  },
  {
    num: '02',
    title: 'SN1P3R NET',
    category: 'AI Risk Engine',
    year: '2025',
    tech: ['Python', 'Llama-3', 'Nmap', 'CVE DB'],
    color: '#0284c7',
    logs: ['› Nmap scan complete (4096 hosts)', '› CVE-2023-38606 detected (score 9.8)', '› LLM verdict: HIGH risk, patch required', '› Report generated and encrypted'],
    desc: 'AI-assisted recon engine that correlates live scan results with CVE databases and provides human-readable risk reports.',
  },
  {
    num: '03',
    title: 'BROWSER LAB',
    category: 'Digital Forensics',
    year: '2024',
    tech: ['JavaScript', 'DOM API', 'IndexedDB'],
    color: '#16a34a',
    logs: ['› Parsing browser history buffer', '› 14 injected scripts extracted', '› Cookie exfiltration path identified', '› Forensic timeline generated'],
    desc: 'A browser-native forensics tool for parsing local storage artifacts, extracting injected scripts, and building forensic timelines.',
  },
];

/* ─── Cursor-tracking marquee row (mix-blend-difference) ─── */
const MixBlendRow: React.FC<{ proj: typeof PROJECTS[0]; idx: number; onClick: () => void; open: boolean }> = ({ proj, idx, onClick, open }) => {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: idx * 0.12 }}
    >
      {/* ── Main hover row ── */}
      <div
        className="relative border-b overflow-hidden cursor-pointer"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Black fill that scales up from bottom on hover (creates the blend effect) */}
        <motion.div
          className="absolute inset-0 bg-black origin-bottom pointer-events-none"
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Row content — mix-blend-difference makes text flip white/black automatically */}
        <div
          className="relative flex items-center justify-between px-6 md:px-12 py-8 md:py-10 gap-6"
          style={{ mixBlendMode: 'difference', color: '#ffffff' }}
        >
          {/* Left: number + title */}
          <div className="flex items-baseline gap-6 flex-1 min-w-0">
            <span className="font-mono text-[11px] shrink-0 opacity-60">{proj.num}</span>
            <span
              className="font-syne font-black uppercase leading-none truncate transition-[padding] duration-500"
              style={{
                fontSize: 'clamp(28px, 5vw, 72px)',
                letterSpacing: '-0.03em',
                paddingLeft: hovered ? '20px' : '0px',
                transition: 'padding-left 0.45s cubic-bezier(0.76,0,0.24,1)',
              }}
            >
              {proj.title}
            </span>
          </div>

          {/* Right: meta */}
          <div className="hidden md:flex items-center gap-10 shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-70">{proj.category}</span>
            <span className="font-mono text-[11px] opacity-40">{proj.year}</span>
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-full border border-current flex items-center justify-center shrink-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Expanded accordion panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-6 md:mx-12 my-6 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl"
              style={{ backgroundColor: '#fafafa', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Description + stack */}
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-3">Description</div>
                <p className="text-sm text-zinc-700 leading-relaxed mb-6">{proj.desc}</p>
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-[11px] font-mono rounded-full bg-white border text-zinc-700"
                          style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminal log */}
              <div className="rounded-xl overflow-hidden font-mono text-xs" style={{ backgroundColor: '#0a0a0a' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
                  <span className="ml-2 text-white/30 text-[10px]">process.log</span>
                </div>
                <div className="p-4 space-y-2">
                  {proj.logs.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                      className="text-green-400"
                    >
                      {l}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Section wrapper ─── */
export const ProjectsSection: React.FC = () => {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <section id="projects" className="bg-white pt-24 pb-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>

      {/* ── Header ── */}
      <div ref={headRef} className="px-6 md:px-12 mb-12 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">02 / Projects</div>
          <h2 className="font-syne font-black text-black uppercase leading-none"
              style={{ fontSize: 'clamp(40px,7vw,100px)', letterSpacing: '-0.03em' }}>
            Selected<br />Works
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="hidden md:block font-mono text-[11px] text-zinc-400 text-right max-w-[200px]"
        >
          Hover to see the<br />blend effect · Click to expand
        </motion.div>
      </div>

      {/* ── Mix-blend project list ── */}
      <div className="border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        {PROJECTS.map((p, i) => (
          <MixBlendRow
            key={p.num}
            proj={p}
            idx={i}
            onClick={() => toggle(i)}
            open={openIdx === i}
          />
        ))}
      </div>

    </section>
  );
};
