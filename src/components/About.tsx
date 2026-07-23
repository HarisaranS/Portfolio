import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Award, BookOpen, Code, Trophy, ExternalLink } from 'lucide-react';

interface CountUpProps {
  value: string;
  duration?: number;
}

function CountUp({ value, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const isFloat = value.includes('.');
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const end = parseFloat(cleanValue);
    if (isNaN(end)) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * end;
      
      setCount(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const suffix = value.includes('+') ? '+' : '';
  const prefix = value.startsWith('$') ? '$' : '';

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-bold text-cyan-400">
      {prefix}{count}{suffix}
    </span>
  );
}

interface ProgressRingProps {
  percentage: number;
  colorClass: string;
}

function ProgressRing({ percentage, colorClass }: ProgressRingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-slate-800"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Animated Foreground Circle */}
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          className={colorClass}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute font-mono text-xs text-white font-bold">{percentage}%</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="scanline" />
      
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
            01 // PROFILE OVERVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            INTRUSION REPORT & CAPABILITIES
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Counters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-panel-cyan rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Terminal className="w-4 h-4" />
                <span>root@harisaran:~$ cat bio.log</span>
              </div>
              
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p>
                  I am a passionate <span className="text-cyan-400 font-semibold">Cybersecurity Student</span> specializing in penetration testing, network defense, and threat intelligence. Currently pursuing my engineering degree at Sri Eshwar College of Engineering, I have dedicated myself to understanding adversarial methodologies and secure design.
                </p>
                <p>
                  My practical exposure ranges from constructing isolated DMZ honeypot infrastructures to auditing web APIs and scripting custom automated scanning tools. I actively participate in CTF (Capture The Flag) competitions and platform rooms, consistently pushing my offensive and defensive security capabilities.
                </p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'TryHackMe Rooms', val: '300+', icon: BookOpen },
                { label: 'LeetCode Solved', val: '230+', icon: Code },
                { label: 'Skillrack Solved', val: '1290+', icon: Award },
                { label: 'CTF Podiums', val: '6+', icon: Trophy },
              ].map((stat, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 text-center border border-white/5 hover:border-cyan-500/20 transition-colors group">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <div className="block font-bold">
                    <CountUp value={stat.val} />
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Platform Telemetry Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              ACTIVE PLATFORM METRICS
            </h3>

            {/* TryHackMe Card */}
            <div className="glass-panel-cyan rounded-2xl p-5 border border-cyan-500/25 flex items-center justify-between hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 group">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">TRYHACKME</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/30">TOP 1%</span>
                </div>
                <p className="text-xs text-slate-400">Solved over 300+ cybersecurity rooms.</p>
                <a
                  href="https://tryhackme.com/p/bl4ckn3t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400 hover:text-white transition-colors"
                >
                  ACCESS RECORD <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <ProgressRing percentage={99} colorClass="stroke-cyan-500" />
            </div>

            {/* LeetCode Card */}
            <div className="glass-panel-purple rounded-2xl p-5 border border-purple-500/25 flex items-center justify-between hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300 group">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">LEETCODE</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800/30">ACTIVE</span>
                </div>
                <p className="text-xs text-slate-400">230+ Data Structures & Algorithms solved.</p>
                <a
                  href="https://leetcode.com/u/HarisaranS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-purple-400 hover:text-white transition-colors"
                >
                  ACCESS RECORD <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <ProgressRing percentage={65} colorClass="stroke-purple-500" />
            </div>

            {/* Skillrack Card */}
            <div className="glass-panel-green rounded-2xl p-5 border border-emerald-500/25 flex items-center justify-between hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 group">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">SKILLRACK</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/30">ELITE CODER</span>
                </div>
                <p className="text-xs text-slate-400">1290+ coding problems solved.</p>
                <a
                  href="https://www.skillrack.com/faces/resume.xhtml?id=515144&key=5352d5bab41e5e1ff193fbfeba89d78dfdf3a50e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 hover:text-white transition-colors"
                >
                  ACCESS RECORD <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <ProgressRing percentage={85} colorClass="stroke-emerald-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
