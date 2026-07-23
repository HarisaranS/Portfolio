import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Shield, Server } from 'lucide-react';

const educationData = [
  {
    institution: 'Sri Eshwar College of Engineering',
    degree: 'B.E. Computer Science and Engineering (Cybersecurity)',
    duration: '2024–2028',
    grade: 'CGPA: 8.43',
    details: 'Immersive focus on Offensive Security, Cryptography, Defensive Controls, and Networks.',
    icon: GraduationCap,
  },
  {
    institution: 'Blue Bird Matric Hr. Sec. School',
    degree: 'Higher Secondary School Certificate (HSC)',
    duration: '2023–2024',
    grade: 'HSC Score: 93.5%',
    details: 'Completed core courses in Computer Science, Mathematics, Physics, and Chemistry.',
    icon: Shield,
  },
  {
    institution: 'Kalaimagal Matriculation School',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    duration: '2021–2022',
    grade: 'SSLC Score: 91.5%',
    details: 'Foundation in science and mathematics.',
    icon: Shield,
  },
];

const experienceData = [
  {
    company: 'CodeAlpha (Cybersecurity)',
    role: 'Cybersecurity Intern',
    duration: 'December 2025',
    skills: 'Cybersecurity and Networking Fundamentals',
    details: [
      'Engineered hands-on security audits, vulnerability scans, and network assessments.',
      'Conducted threat analysis using wireframes, network analysis utilities, and log collectors.',
      'Refined technical reporting and defensive strategies through simulated attack mitigation.',
    ],
    icon: Briefcase,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="cyber-grid-cyan absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block text-purple-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded bg-purple-950/20 border border-purple-800/30 mb-3">
            02 // EDUCATION & TRAINING
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            TIMELINE OF OPERATION
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          
          {/* Column 1: Education */}
          <div className="space-y-8 relative">
            <h3 className="font-mono text-sm font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5" />
              Academic Log
            </h3>
            
            {/* Vertical Line */}
            <div className="absolute left-6 top-16 bottom-2 w-[1px] bg-slate-800 pointer-events-none">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"
              />
            </div>

            <div className="space-y-8 pl-12 relative">
              {educationData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-panel-cyan rounded-2xl p-6 relative group hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/35"
                >
                  {/* Timeline bullet node */}
                  <div className="absolute -left-[54px] top-6 w-5 h-5 rounded-full bg-cyber-bg border-2 border-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_8px_#06b6d4]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/30">
                      {item.duration}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">{item.grade}</span>
                  </div>

                  <h4 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                    {item.institution}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm font-mono mb-2">{item.degree}</p>
                  <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-8 relative">
            <h3 className="font-mono text-sm font-semibold text-purple-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5" />
              Tactical Experience
            </h3>

            {/* Vertical Line */}
            <div className="absolute left-6 top-16 bottom-2 w-[1px] bg-slate-800 pointer-events-none">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
              />
            </div>

            <div className="space-y-8 pl-12 relative">
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-panel-purple rounded-2xl p-6 relative group hover:shadow-[0_0_25px_rgba(168,85,247,0.08)] transition-all duration-300 border border-purple-500/10 hover:border-purple-500/35"
                >
                  {/* Timeline bullet node */}
                  <div className="absolute -left-[54px] top-6 w-5 h-5 rounded-full bg-cyber-bg border-2 border-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_8px_#a855f7]">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:animate-ping" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800/30">
                      {item.duration}
                    </span>
                    <span className="font-mono text-xs text-purple-400 font-bold flex items-center gap-1">
                      <Server className="w-3.5 h-3.5 text-purple-500" />
                      INTERNSHIP
                    </span>
                  </div>

                  <h4 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-purple-400 transition-colors">
                    {item.company}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm font-mono mb-3">{item.role}</p>
                  
                  <div className="text-slate-400 text-xs sm:text-sm font-sans space-y-2 mb-3">
                    {item.details.map((detail, dIdx) => (
                      <p key={dIdx} className="leading-relaxed">
                        • {detail}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-500/10">
                    <div className="font-mono text-[10px] text-slate-500">CORE COMPETENCY DEVELOPED:</div>
                    <div className="text-xs text-white font-mono font-medium mt-1">
                      {item.skills}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
