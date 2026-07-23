import { motion } from 'framer-motion';
import { Trophy, Award, Medal, ShieldCheck, Cpu, Cloud, Globe, Key, GraduationCap } from 'lucide-react';

const achievementsData = [
  {
    title: 'First Place — CREST CTF',
    year: '2026',
    meta: 'Adversary Simulation / Exploitation',
    placement: 'gold',
    icon: Trophy,
  },
  {
    title: 'Second Runner-up — AxiosCTF',
    year: '2026',
    meta: 'Network Auditing / Cryptography',
    placement: 'silver',
    icon: Medal,
  },
  {
    title: 'Second Runner-up — TrustoryxScamAwarenessCTF',
    year: '2025',
    meta: 'Social Engineering & Threat Mitigation',
    placement: 'silver',
    icon: Medal,
  },
  {
    title: 'Finalist — LakshyaCTF',
    year: '2025',
    meta: 'Attack & Defense Simulation',
    placement: 'bronze',
    icon: Award,
  },
  {
    title: 'Third Place — Skillrack Top Coder',
    year: '2024',
    meta: 'Data Structures & Algorithmic Parsing',
    placement: 'bronze',
    icon: Trophy,
  },
  {
    title: 'Certificate of Appreciation — Dev Town',
    year: '2025',
    meta: 'DevOps & Systems Architecture contribution',
    placement: 'info',
    icon: Award,
  },
];

const certificationsData = [
  {
    title: 'Certified Jr Penetration Tester (PT1)',
    issuer: 'TryHackMe',
    year: '2026',
    icon: Key,
    theme: 'cyan',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    border: 'border-cyan-500/20',
  },
  {
    title: 'Network Defense Essential (NDE)',
    issuer: 'EC-Council',
    year: '2026',
    icon: ShieldCheck,
    theme: 'purple',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    border: 'border-purple-500/20',
  },
  {
    title: 'Apisec Certified Practitioner',
    issuer: 'ApiSec University',
    year: '2026',
    icon: Globe,
    theme: 'green',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    border: 'border-emerald-500/20',
  },
  {
    title: 'AWS Academy Cloud Foundation',
    issuer: 'AWS',
    year: '2026',
    icon: Cloud,
    theme: 'cyan',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    border: 'border-cyan-500/20',
  },
  {
    title: 'BlueTeam Junior Analyst',
    issuer: 'Security Blue Team',
    year: '2025',
    icon: Cpu,
    theme: 'purple',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]',
    border: 'border-purple-500/20',
  },
  {
    title: 'CompTIA Security+ (SY0-701)',
    issuer: 'Udemy Academic Program',
    year: '2025',
    icon: GraduationCap,
    theme: 'green',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    border: 'border-emerald-500/20',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded bg-cyan-950/20 border border-cyan-800/30 mb-3">
            04 // ACCOLADES & VERIFIED RECORDS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            HONORS & CREDENTIALS
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Achievements */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-cyan-400" />
              CTF Placements & Contests
            </h3>

            <div className="space-y-4">
              {achievementsData.map((item, idx) => {
                const ItemIcon = item.icon;
                let borderTheme = 'border-l-2 border-l-slate-700';
                let tagTheme = 'bg-slate-900/60 text-slate-400 border-slate-700/30';
                
                if (item.placement === 'gold') {
                  borderTheme = 'border-l-2 border-l-yellow-500';
                  tagTheme = 'bg-yellow-950/20 text-yellow-400 border-yellow-800/30';
                } else if (item.placement === 'silver') {
                  borderTheme = 'border-l-2 border-l-purple-500';
                  tagTheme = 'bg-purple-950/20 text-purple-400 border-purple-800/30';
                } else if (item.placement === 'bronze') {
                  borderTheme = 'border-l-2 border-l-cyan-500';
                  tagTheme = 'bg-cyan-950/20 text-cyan-400 border-cyan-800/30';
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`glass-panel rounded-xl p-4 flex items-center justify-between border border-white/5 ${borderTheme} hover:bg-slate-900/30 hover:border-slate-800 transition-all group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg bg-black border border-white/5 ${
                        item.placement === 'gold' ? 'text-yellow-400' : item.placement === 'silver' ? 'text-purple-400' : 'text-cyan-400'
                      }`}>
                        <ItemIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-xs mt-0.5 font-sans">{item.meta}</p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${tagTheme}`}>
                      {item.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono text-sm font-semibold text-purple-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Professional Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((item, idx) => {
                const CertIcon = item.icon;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`glass-panel rounded-xl p-5 border ${item.border} hover:${item.glow} hover:bg-slate-900/30 transition-all group flex flex-col justify-between h-40`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className={`p-2 rounded-lg bg-black border border-white/5 ${
                          item.theme === 'cyan' ? 'text-cyan-400' : item.theme === 'purple' ? 'text-purple-400' : 'text-emerald-400'
                        }`}>
                          <CertIcon className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-slate-500 uppercase">ISSUER:</span>
                      <span className="font-mono text-[10px] text-slate-300 font-semibold uppercase">
                        {item.issuer}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
