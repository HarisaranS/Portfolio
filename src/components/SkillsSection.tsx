'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Terminal skill display — cybersecurity-native ─── */

const COMMANDS: { cmd: string; output: string[] }[] = [
  {
    cmd: 'list --category offensive',
    output: [
      '  ╔══════════════════════════════════════╗',
      '  ║  OFFENSIVE SECURITY TOOLS            ║',
      '  ╠══════════════════════════════════════╣',
      '  ║  Burp Suite Pro       ██████████ 95% ║',
      '  ║  Nmap / Masscan       ██████████ 97% ║',
      '  ║  Metasploit           █████████░ 92% ║',
      '  ║  SQLMap               ████████░░ 88% ║',
      '  ║  Hydra / Hashcat      ████████░░ 85% ║',
      '  ╚══════════════════════════════════════╝',
    ],
  },
  {
    cmd: 'list --category defensive',
    output: [
      '  ╔══════════════════════════════════════╗',
      '  ║  DEFENSIVE & SIEM STACK              ║',
      '  ╠══════════════════════════════════════╣',
      '  ║  Wazuh SIEM           █████████░ 90% ║',
      '  ║  Velociraptor EDR     ████████░░ 84% ║',
      '  ║  Splunk               ███████░░░ 72% ║',
      '  ║  Snort IDS            ███████░░░ 78% ║',
      '  ║  Fail2ban             ████████░░ 88% ║',
      '  ╚══════════════════════════════════════╝',
    ],
  },
  {
    cmd: 'list --category languages',
    output: [
      '  ╔══════════════════════════════════════╗',
      '  ║  PROGRAMMING LANGUAGES               ║',
      '  ╠══════════════════════════════════════╣',
      '  ║  Python               ██████████ 96% ║',
      '  ║  Bash / Shell         █████████░ 94% ║',
      '  ║  JavaScript           ████████░░ 85% ║',
      '  ║  Go                   ████████░░ 82% ║',
      '  ║  C / Assembly         ███████░░░ 75% ║',
      '  ╚══════════════════════════════════════╝',
    ],
  },
  {
    cmd: 'list --category cloud-ai',
    output: [
      '  ╔══════════════════════════════════════╗',
      '  ║  CLOUD & AI SECURITY                 ║',
      '  ╠══════════════════════════════════════╣',
      '  ║  LLM Red Teaming      ████████░░ 88% ║',
      '  ║  Llama-3 / LangChain  ████████░░ 83% ║',
      '  ║  AWS Security         ████████░░ 80% ║',
      '  ║  Docker / K8s         ███████░░░ 76% ║',
      '  ║  Terraform            ███████░░░ 70% ║',
      '  ╚══════════════════════════════════════╝',
    ],
  },
];

const PROMPT = 'harisaran@portfolio:~$';

/* ─── Typewriter line ─── */
const TypedLine: React.FC<{ text: string; delay: number; speed?: number; className?: string }> = ({
  text, delay, speed = 30, className = ''
}) => {
  const [shown, setShown] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setShown(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <span className={className}>{shown}</span>;
};

/* ─── Terminal block ─── */
const TerminalBlock: React.FC<{ entry: typeof COMMANDS[0]; blockIdx: number; globalDelay: number }> = ({
  entry, blockIdx, globalDelay,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView]);

  // Estimate when command finishes typing
  const cmdDuration = entry.cmd.length * 30 + globalDelay;

  return (
    <div ref={ref} className="mb-4">
      {visible && (
        <>
          {/* Prompt + command */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-green-400 text-xs font-mono shrink-0">{PROMPT}</span>
            <TypedLine
              text={entry.cmd}
              delay={globalDelay}
              speed={28}
              className="text-white text-xs font-mono"
            />
          </div>

          {/* Output lines */}
          {entry.output.map((line, li) => {
            const lineDelay = cmdDuration + li * 40;
            return (
              <motion.div
                key={li}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: lineDelay / 1000, duration: 0.15 }}
                className="font-mono text-[11px] text-green-300 leading-relaxed whitespace-pre"
              >
                {line}
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  // Build cumulative delays
  const delays: number[] = [];
  let acc = 0;
  COMMANDS.forEach(c => {
    delays.push(acc);
    acc += c.cmd.length * 30 + c.output.length * 40 + 600;
  });

  return (
    <section id="skills"
      className="bg-zinc-50 pt-24 pb-20"
      style={{ borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
    >
      {/* ── Header ── */}
      <div ref={headRef} className="px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">03 / Skills</div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
            <h2 className="font-syne font-black text-black uppercase leading-none"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.03em' }}>
              Skill<br />Terminal
            </h2>
            <p className="text-sm text-zinc-500 max-w-xs md:pb-4 leading-relaxed">
              Live CLI readout of the full offensive & defensive skill stack. Scroll to execute.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Terminal window ── */}
      <div className="px-6 md:px-12">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            <span className="ml-4 font-mono text-[11px] text-white/25">skills.sh — harisaran@portfolio</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] text-green-400/60">LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 min-h-[520px]">
            {/* Intro banner */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="font-mono text-[11px] text-white/30 mb-1">
                ┌─────────────────────────────────────────────────────────────┐
              </div>
              <div className="font-mono text-[11px] text-white/30 mb-1">
                │  HARISARAN S · CYBERSECURITY ENGINEER · SKILL READOUT v2.6  │
              </div>
              <div className="font-mono text-[11px] text-white/30 mb-4">
                └─────────────────────────────────────────────────────────────┘
              </div>
            </motion.div>

            {/* Commands */}
            {COMMANDS.map((entry, i) => (
              <TerminalBlock
                key={i}
                entry={entry}
                blockIdx={i}
                globalDelay={delays[i] + 400}
              />
            ))}

            {/* Final prompt with blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (delays[COMMANDS.length - 1] + 2000) / 1000 }}
              className="flex items-center gap-3 mt-4"
            >
              <span className="text-green-400 text-xs font-mono">{PROMPT}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-4 bg-green-400"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
