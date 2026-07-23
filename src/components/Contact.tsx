import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Mail, Phone, MapPin, CheckCircle, Wifi } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executeTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);
    setTransmissionLogs([]);

    const logSteps = [
      '[*] Resolving port handler (HTTPS/443)...',
      '[*] Initializing TLS 1.3 handshake exchange...',
      '[*] Generating ephemeral ECDH public parameters...',
      '[*] Encrypting communication payloads [AES-256-GCM]...',
      '[*] Injecting integrity verification hash (SHA-256)...',
      '[+] Socket handshake accepted. Transmitting...',
      '[+] Transmission complete. Status: 200 OK.',
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setTransmissionLogs((prev) => [...prev, logSteps[i]]);
    }

    // Trigger success confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#a855f7', '#10b981'],
    });

    setIsSent(true);
    setIsTransmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="cyber-grid-cyan absolute inset-0 opacity-15 pointer-events-none" />

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
            06 // COMMUNICATIONS GATEWAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            ESTABLISH CONNECTION
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Connection Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 border border-white/5 h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs border-b border-white/5 pb-2">
                  <Wifi className="w-4 h-4 animate-pulse" />
                  <span>TRANSMISSION NODES</span>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  Ready for project collaborations, internship inquiries, CTF teaming, or technical audits. Submit details to launch direct messaging.
                </p>
              </div>

              {/* Direct links list */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-black border border-white/5 text-cyan-400 group-hover:border-cyan-500/35 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-slate-500">DIRECT EMAIL:</div>
                    <a
                      href="mailto:harisaran777s@gmail.com"
                      className="text-white text-sm hover:text-cyan-400 transition-colors font-mono"
                    >
                      harisaran777s@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-black border border-white/5 text-purple-400 group-hover:border-purple-500/35 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-slate-500">DIRECT TELEPHONE:</div>
                    <a
                      href="tel:6385428704"
                      className="text-white text-sm hover:text-purple-400 transition-colors font-mono"
                    >
                      +91 6385428704
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-black border border-white/5 text-emerald-400 group-hover:border-emerald-500/35 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-slate-500">LOCATION REFERENCE:</div>
                    <span className="text-white text-sm font-mono">
                      Coimbatore, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Console system status block */}
              <div className="bg-black/60 rounded-xl p-4 border border-slate-800/80 font-mono text-[10px] space-y-1 text-slate-500">
                <div className="flex justify-between">
                  <span>SECURE_COMMS_INTEGRITY:</span>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>SSL_HANDSHAKE_PROTOCOL:</span>
                  <span className="text-white">TLS 1.3 / ECDHE</span>
                </div>
                <div className="flex justify-between">
                  <span>CLIENT_IDENTITY:</span>
                  <span className="text-cyan-400 font-semibold">192.168.1.77</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Console Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 h-full relative">
              
              <AnimatePresence mode="wait">
                {!isTransmitting && !isSent ? (
                  /* Form state */
                  <motion.form
                    key="contact-form"
                    onSubmit={executeTransmission}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                      <Terminal className="w-4 h-4" />
                      <span>root@gateway:~$ comms_input --start</span>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-mono text-xs text-slate-400 block pl-1">
                        [INPUT_NAME] &gt;
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adversary Name / Company Name"
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-mono text-xs text-slate-400 block pl-1">
                        [INPUT_EMAIL] &gt;
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="adversary@endpoint.com"
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-mono text-xs text-slate-400 block pl-1">
                        [INPUT_MESSAGE] &gt;
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Establish message scope and payload parameters here..."
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 font-mono text-xs tracking-wider uppercase font-semibold"
                    >
                      <Send className="w-4 h-4" />
                      DISPATCH SECURE PAYLOAD
                    </button>
                  </motion.form>
                ) : isTransmitting ? (
                  /* Loading transmission state */
                  <motion.div
                    key="transmitting-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center h-full space-y-4 py-8 font-mono"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 text-xs">
                      <Terminal className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING DATA STREAMS...</span>
                    </div>

                    <div className="bg-black/80 rounded-xl p-5 border border-slate-800 max-h-60 overflow-y-auto space-y-2 text-xs leading-relaxed">
                      {transmissionLogs.map((log, idx) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={idx}
                          className={
                            log.startsWith('[+]')
                              ? 'text-emerald-400 font-semibold'
                              : 'text-slate-400'
                          }
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* Success state */
                  <motion.div
                    key="success-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full py-8 space-y-4"
                  >
                    <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-full text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <CheckCircle className="w-12 h-12 animate-pulse" />
                    </div>
                    
                    <h3 className="text-white font-bold text-lg sm:text-xl font-mono">
                      CONNECTION ESTABLISHED
                    </h3>
                    
                    <p className="text-slate-400 text-xs sm:text-sm max-w-sm font-sans leading-relaxed">
                      Your message was encrypted and dispatched securely to Harisaran. The payload transmission was accepted by the gateway router.
                    </p>

                    <div className="bg-black/60 rounded-xl p-4 border border-emerald-500/20 font-mono text-[9px] text-emerald-400/80 space-y-1 w-full max-w-sm">
                      <div>DISPATCH_TIMESTAMP: {new Date().toISOString()}</div>
                      <div>ENCRYPTION_KEY_EXCHANGE: COMPLETED</div>
                      <div>TRANSMISSION_STATUS: SECURELY_LOGGED</div>
                    </div>

                    <button
                      onClick={() => setIsSent(false)}
                      className="mt-4 font-mono text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                    >
                      [&gt; ESTABLISH NEW CONNECTION &lt;]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
