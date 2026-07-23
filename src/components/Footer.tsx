import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-black/40 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
            <span>HARISARAN S</span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 font-mono text-center md:text-left">
            © {new Date().getFullYear()} Harisaran S. All security protocols maintained.
          </p>
        </div>

        {/* Console latency status */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ENCRYPTED LINK: HTTPS / SHA-256</span>
          </div>
          <div>GATEWAY LATENCY: 14ms</div>
        </div>

        {/* Scroll back to top */}
        <button
          onClick={handleScrollTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-black/40 text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all group"
          title="Scroll to Top"
        >
          SCROLL_TOP
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        
      </div>
    </footer>
  );
}
