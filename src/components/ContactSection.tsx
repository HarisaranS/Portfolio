'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

/* ─── Typewriter hook ─── */
function useTypewriter(text: string, delay: number, speed = 55) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, speed]);

  return { displayed, done };
}

/* ─── Email copy button ─── */
const CopyEmail: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'harisaran777s@gmail.com';

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-4 border-b border-white/20 pb-3"
    >
      <span className="font-syne font-black text-white leading-none"
            style={{ fontSize: 'clamp(16px, 2vw, 28px)' }}>
        {email}
      </span>
      <motion.div
        animate={{ rotate: copied ? 0 : 0 }}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/50 group-hover:border-white/60 group-hover:text-white transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </motion.div>
      {copied && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="font-mono text-xs text-green-400"
        >
          Copied!
        </motion.span>
      )}
    </motion.button>
  );
};

/* ─── Main Contact ─── */
export const ContactSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const line1 = useTypewriter("Let's", inView ? 400 : 99999, 80);
  const line2 = useTypewriter('Build', inView ? line1.done ? 100 : 1400 : 99999, 80);
  const line3 = useTypewriter('Something.', inView ? line2.done ? 100 : 2200 : 99999, 65);

  return (
    <section id="contact" className="relative overflow-hidden" style={{ backgroundColor: '#050506' }}>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Main content ── */}
      <div ref={ref} className="relative z-10 px-6 md:px-12 pt-20 pb-0">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/20 mb-12"
        >
          07 / Contact
        </motion.div>

        {/* ── Typewriter headline ── */}
        <div
          className="font-syne font-black uppercase text-white leading-[0.88] mb-16"
          style={{ fontSize: 'clamp(64px, 13vw, 200px)', letterSpacing: '-0.04em', minHeight: '3.5em' }}
        >
          <div>{line1.displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-[0.06em] h-[0.9em] bg-white align-bottom ml-1"
            style={{ display: line1.done ? 'none' : 'inline-block' }} /></div>

          <div className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}>
            {line2.displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }}
              className="inline-block w-[0.06em] h-[0.9em] align-bottom ml-1"
              style={{ display: line2.done || !line1.done ? 'none' : 'inline-block', WebkitTextStroke: 'none', backgroundColor: 'rgba(255,255,255,0.4)' }} />
          </div>

          <div>{line3.displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-[0.06em] h-[0.9em] bg-white align-bottom ml-1"
            style={{ display: line3.done || !line2.done ? 'none' : 'inline-block' }} /></div>
        </div>
      </div>

      {/* ── Info bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {/* Email */}
        <div className="px-6 md:px-12 py-10 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5">Direct Line</div>
          <CopyEmail />
        </div>

        {/* Social links */}
        <div className="px-6 md:px-12 py-10 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5">Profiles</div>
          <div className="space-y-3">
            {[
              { label: 'GitHub', href: 'https://github.com/HarisaranS/' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/harisaran-s-a08a1b333' },
              { label: 'TryHackMe', href: 'https://tryhackme.com' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 group w-fit">
                <span className="font-syne font-bold text-white/50 group-hover:text-white transition-colors text-sm">
                  {link.label}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="px-6 md:px-12 py-10">
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5">Status</div>
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-green-400"
            />
            <span className="font-syne font-bold text-white text-base">Open to Opportunities</span>
          </div>
          <p className="font-mono text-xs text-white/30 leading-relaxed">
            Available for full-time roles,<br />internships & freelance projects.
          </p>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 px-6 md:px-12 py-5 border-t flex items-center justify-between"
           style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <span className="font-mono text-[10px] text-white/15">© 2026 Harisaran S</span>
        <span className="font-mono text-[10px] text-white/15">Coimbatore, India</span>
      </div>
    </section>
  );
};
