import { motion } from 'framer-motion';
import { useDecryptText } from '../hooks/useDecryptText';
import { Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const { displayText: nameText, trigger: triggerNameDecrypt } = useDecryptText('Harisaran_S', 45, 2);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offsetTop = projectsSection.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const offsetTop = aboutSection.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden cyber-grid-cyan"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Main hero card */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Top security tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-950/20 text-cyan-400 font-mono text-xs tracking-wider mb-6"
        >
          <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SECURITY STATUS: ACTIVE</span>
        </motion.div>

        {/* Decrypting Title */}
        <motion.h1
          onMouseEnter={triggerNameDecrypt}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white cursor-pointer select-none mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            {nameText}
          </span>
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl font-mono text-cyan-400 font-semibold mb-6 tracking-wide"
        >
          Cybersecurity Student | Penetration Testing & Threat Analysis
        </motion.p>

        {/* Education & Bio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed mb-8 space-y-2"
        >
          <p>
            Pursuing B.E. Computer Science and Engineering (specializing in Cybersecurity) at{' '}
            <span className="text-white font-medium inline-block whitespace-nowrap">Sri Eshwar College of Engineering</span>.
          </p>
          <p className="font-mono text-xs text-slate-500">
            CURRENT STANDING: CGPA 8.43 | CLASS OF 2024–2028
          </p>
        </motion.div>

        {/* Contact Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12"
        >
          <a
            href="tel:6385428704"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <Phone className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs">6385428704</span>
          </a>

          <a
            href="mailto:harisaran777s@gmail.com"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs">harisaran777s@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/harisaran-s-a08a1b333/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <LinkedinIcon className="w-4.5 h-4.5 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs">LinkedIn</span>
          </a>

          <a
            href="https://github.com/HarisaranS/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <GithubIcon className="w-4.5 h-4.5 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs">GitHub</span>
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          {/* Animated Glowing border button */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="relative group p-[1px] rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {/* Spinning gradient border */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-800 via-slate-800 to-cyan-800 rounded-xl animate-spin duration-3000 opacity-40 group-hover:opacity-75 transition-opacity" style={{ animationDuration: '4s' }} />
            
            {/* Inner button content */}
            <span className="relative block px-8 py-3.5 bg-black rounded-[11px] text-cyan-400 font-mono text-sm tracking-wider font-semibold transition-all group-hover:bg-cyan-950/20 group-hover:text-white flex items-center gap-2">
              VIEW PROJECTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Secondary Button - About Section */}
          <button
            onClick={handleScrollToAbout}
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-indigo-500/30 bg-white/5 hover:bg-indigo-950/10 text-slate-300 hover:text-indigo-400 transition-all duration-300 font-mono text-sm tracking-wider"
          >
            <ArrowRight className="w-4 h-4" />
            LEARN MORE
          </button>
        </motion.div>
      </div>

      {/* Cybernetic Tech Details at the bottom corner */}
      <div className="absolute bottom-4 left-6 hidden lg:block font-mono text-[10px] text-slate-600">
        <p>SYSTEM INTEGRITY: VERIFIED [100%]</p>
        <p>IP ADDRESS: 192.168.1.77</p>
      </div>
      <div className="absolute bottom-4 right-6 hidden lg:block font-mono text-[10px] text-slate-600 text-right">
        <p>ENCRYPTION: AES-256-GCM</p>
        <p>DESIRED ROLE: OFFENSIVE SECURITY ENGINEER</p>
      </div>
    </section>
  );
}
