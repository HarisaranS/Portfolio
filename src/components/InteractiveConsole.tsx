'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, THEMES } from '@/store/portfolioStore';
import { Terminal, X, Minimize2, Send, ShieldCheck, Sparkles } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveConsole: React.FC = () => {
  const { theme } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'system.init',
      output: (
        <span className="text-emerald-500 font-bold">
          [SUCCESS] Connected to Harisaran S Security Terminal. Type <code className="bg-white/10 px-1 py-0.5 rounded text-white">help</code> to list commands.
        </span>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, open]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <div>Available Security Terminal Commands:</div>
            <div><span className="text-[#2563eb] font-bold">whoami</span> - Display candidate profile &amp; degree track</div>
            <div><span className="text-[#2563eb] font-bold">skills</span> - List cybersecurity tools &amp; programming stacks</div>
            <div><span className="text-[#2563eb] font-bold">projects</span> - View Aegis SOC, Sn1p3rNetX &amp; Forensics Workbench</div>
            <div><span className="text-[#2563eb] font-bold">certs</span> - Display 5 validated security certifications</div>
            <div><span className="text-[#2563eb] font-bold">contact</span> - Show direct email &amp; phone contacts</div>
            <div><span className="text-[#2563eb] font-bold">hire</span> - Trigger recruitment proposal modal</div>
            <div><span className="text-[#2563eb] font-bold">clear</span> - Clear terminal scroll history</div>
          </div>
        );
        break;
      case 'whoami':
        output = 'Harisaran S — B.E CSE (Cybersecurity) student at Sri Eshwar College of Engineering. CGPA 8.43. TryHackMe Top 1%. CREST CTF 1st Place Winner.';
        break;
      case 'skills':
        output = 'Languages: Python, Go, Java, JavaScript, Bash, SQL. Tools: Nmap, Burp Suite, Wireshark, Metasploit, Wazuh SIEM, Velociraptor EDR, AWS, Docker.';
        break;
      case 'projects':
        output = '1. Aegis Shield (AI Autonomous SOC) | 2. Sn1p3rNetX (AI Vulnerability Scanner) | 3. Browser Forensics Workbench.';
        break;
      case 'certs':
        output = '1. eJPT/PT1 (TryHackMe) | 2. NDE (EC-Council) | 3. APISec Practitioner | 4. AWS Cloud Foundation | 5. CompTIA Security+';
        break;
      case 'contact':
        output = 'Email: harisaran777s@gmail.com | Phone: +91 6385428704 | LinkedIn: linkedin.com/in/harisaran-s-a08a1b333 | GitHub: github.com/HarisaranS/';
        break;
      case 'hire':
        output = (
          <span className="text-emerald-500 font-bold">
            [OFFER ACCEPTED] Thank you for your interest! Please send recruitment proposals directly to harisaran777s@gmail.com or call +91 6385428704.
          </span>
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Interactive Security Terminal Launcher Button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[6000] p-3.5 rounded-2xl glass-header border shadow-2xl flex items-center gap-2.5 font-mono text-xs font-bold pointer-events-auto"
        style={{
          backgroundColor: t.isDark ? 'rgba(18, 20, 29, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: t.border,
          color: t.textPrimary,
        }}
        title="Open Interactive Security Terminal"
      >
        <div className="p-1.5 rounded-xl bg-slate-900 text-emerald-400">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="hidden sm:inline">Security Console &gt;_</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </motion.button>

      {/* Terminal Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[7000] w-[92vw] sm:w-[480px] h-[500px] rounded-3xl glass-header border shadow-2xl flex flex-col overflow-hidden font-mono text-xs pointer-events-auto"
            style={{
              backgroundColor: t.isDark ? '#090a0f' : '#ffffff',
              borderColor: t.border,
            }}
          >
            {/* Titlebar */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between"
              style={{ backgroundColor: t.isDark ? '#12141d' : '#f8fafc', borderColor: t.border }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-bold text-[11px] ml-2" style={{ color: t.textPrimary }}>
                  harisaran@security-console:~
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-black/10 transition-colors"
                style={{ color: t.textMuted }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal History Screen */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed">
              {history.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2" style={{ color: t.accentSecondary }}>
                    <span>$</span>
                    <span className="font-bold text-slate-800 dark:text-white">{h.command}</span>
                  </div>
                  <div className="pl-4" style={{ color: t.textMuted }}>
                    {h.output}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleCommand}
              className="p-3 border-t flex items-center gap-2"
              style={{ backgroundColor: t.isDark ? '#12141d' : '#f8fafc', borderColor: t.border }}
            >
              <span className="text-emerald-500 font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help', 'skills', 'projects', 'hire'..."
                className="flex-1 bg-transparent outline-none font-mono text-xs"
                style={{ color: t.textPrimary }}
                autoFocus
              />
              <button
                type="submit"
                className="p-2 rounded-xl transition-colors"
                style={{ backgroundColor: t.accent, color: t.isDark ? '#090a0f' : '#ffffff' }}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
