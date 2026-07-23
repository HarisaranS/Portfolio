import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Code, Cpu, Shield, Layers } from 'lucide-react';

interface SkillItem {
  name: string;
  level: string; // e.g., 'Expert', 'Intermediate'
}

interface SkillCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  glow: string;
  items: SkillItem[];
}

const skillsData: SkillCategory[] = [
  {
    id: 'cybersec-tools',
    name: 'Cybersecurity Tools',
    icon: Shield,
    color: '#06b6d4', // cyan
    glow: 'rgba(6, 182, 212, 0.4)',
    items: [
      { name: 'Wireshark', level: 'Advanced' },
      { name: 'Nmap', level: 'Expert' },
      { name: 'Burp Suite', level: 'Advanced' },
      { name: 'Metasploit', level: 'Advanced' },
      { name: 'Nessus', level: 'Intermediate' },
      { name: 'ExploitDB', level: 'Advanced' },
    ],
  },
  {
    id: 'cybersec-concepts',
    name: 'Cybersecurity Concepts',
    icon: Network,
    color: '#a855f7', // purple
    glow: 'rgba(168, 85, 247, 0.4)',
    items: [
      { name: 'Web App Security', level: 'Advanced' },
      { name: 'API Security', level: 'Advanced' },
      { name: 'Active Directory', level: 'Intermediate' },
      { name: 'Network Security', level: 'Expert' },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: Code,
    color: '#10b981', // green
    glow: 'rgba(16, 185, 129, 0.4)',
    items: [
      { name: 'Python', level: 'Expert' },
      { name: 'Java', level: 'Advanced' },
      { name: 'C', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Bash Scripting', level: 'Advanced' },
    ],
  },
  {
    id: 'tools-tech',
    name: 'Tools & Technology',
    icon: Cpu,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    items: [
      { name: 'Git & GitHub', level: 'Expert' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'AWS Cloud', level: 'Intermediate' },
      { name: 'Linux (Ubuntu/Kali)', level: 'Expert' },
      { name: 'VS Code', level: 'Expert' },
      { name: 'Canva', level: 'Intermediate' },
    ],
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    icon: Layers,
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    items: [
      { name: 'OOP Concepts', level: 'Advanced' },
      { name: 'Data Structures', level: 'Advanced' },
      { name: 'Algorithms', level: 'Advanced' },
    ],
  },
];

export default function Skills() {
  const [selectedCat, setSelectedCat] = useState<string>('cybersec-tools');

  // Coordinates for Category nodes in 500x500 SVG
  const cx = 250;
  const cy = 250;
  const radius = 130;

  const getCatCoords = (index: number) => {
    const angle = (index * 72 * Math.PI) / 180 - Math.PI / 2; // offset to start top
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const activeCategoryIndex = skillsData.findIndex((c) => c.id === selectedCat);
  const activeCategory = skillsData[activeCategoryIndex];

  return (
    <section id="skills" className="relative py-24 border-t border-slate-900 overflow-hidden">
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
            05 // KNOWLEDGE MATRIX
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            INTERACTIVE SKILLS TELEMETRY
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Category selector & text panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider px-1">
                SELECT SECTOR TO DECRYPT
              </h3>
              <div className="space-y-2">
                {skillsData.map((cat) => {
                  const isSelected = selectedCat === cat.id;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-900/60 text-white'
                          : 'bg-black/20 text-slate-400 border-white/5 hover:border-slate-800 hover:text-slate-200'
                      }`}
                      style={{
                        borderColor: isSelected ? cat.color + '50' : '',
                        boxShadow: isSelected ? `0 0 15px ${cat.glow}20` : '',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-1.5 rounded-lg bg-black/60 border"
                          style={{ borderColor: isSelected ? cat.color + '30' : 'rgba(255,255,255,0.05)', color: cat.color }}
                        >
                          <CatIcon className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-wide">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">
                        {cat.items.length} NODES
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subskills Panel */}
            <div className="glass-panel-cyan rounded-xl p-5 border border-cyan-500/10">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="font-mono text-xs text-slate-500">DECRYPTED TELEMETRY</span>
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
                  {activeCategory.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {activeCategory.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-black/50 border border-white/5 rounded-lg flex flex-col hover:border-cyan-500/20 transition-colors"
                  >
                    <span className="text-white text-xs sm:text-sm font-semibold">{skill.name}</span>
                    <span className="font-mono text-[9px] text-cyan-400/70 mt-1 uppercase">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Node Graph Visualizer */}
          <div className="lg:col-span-7 flex justify-center items-center relative select-none">
            <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
            
            {/* SVG Visual Node Graph */}
            <div className="w-full max-w-[440px] aspect-square rounded-2xl border border-white/5 glass-panel p-4 overflow-hidden relative">
              <div className="absolute top-3 right-3 font-mono text-[9px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                NEURAL_GRID_V2.0
              </div>

              <svg viewBox="0 0 500 500" className="w-full h-full">
                {/* 1. Connections from Center to Category Nodes */}
                {skillsData.map((cat, idx) => {
                  const coords = getCatCoords(idx);
                  const isSelected = selectedCat === cat.id;
                  return (
                    <motion.line
                      key={`line-${cat.id}`}
                      x1={cx}
                      y1={cy}
                      x2={coords.x}
                      y2={coords.y}
                      stroke={isSelected ? cat.color : '#1e293b'}
                      strokeWidth={isSelected ? 1.5 : 0.8}
                      strokeDasharray={isSelected ? '0' : '4 4'}
                      animate={isSelected ? { strokeWidth: [1.5, 2.5, 1.5] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  );
                })}

                {/* 2. Connections from Selected Category to Orbiting Sub-skills */}
                {activeCategoryIndex !== -1 && (
                  <>
                    {activeCategory.items.map((_, sIdx) => {
                      const catCoords = getCatCoords(activeCategoryIndex);
                      const subAngle = (sIdx * (360 / activeCategory.items.length) * Math.PI) / 180;
                      const subX = catCoords.x + 55 * Math.cos(subAngle);
                      const subY = catCoords.y + 55 * Math.sin(subAngle);

                      return (
                        <motion.line
                          key={`sub-line-${sIdx}`}
                          x1={catCoords.x}
                          y1={catCoords.y}
                          x2={subX}
                          y2={subY}
                          initial={{ x2: catCoords.x, y2: catCoords.y, opacity: 0 }}
                          animate={{ x2: subX, y2: subY, opacity: 0.7 }}
                          stroke={activeCategory.color}
                          strokeWidth={1}
                        />
                      );
                    })}
                  </>
                )}

                {/* 3. Render Center core node */}
                <g className="cursor-pointer">
                  <circle cx={cx} cy={cy} r="24" fill="#030308" stroke="#1e293b" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r="18" fill="rgba(6, 182, 212, 0.05)" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="8"
                    fill="#06b6d4"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="shadow-[0_0_10px_#06b6d4]"
                  />
                  <text
                    x={cx}
                    y={cy + 34}
                    textAnchor="middle"
                    fill="#475569"
                    className="font-mono text-[9px] font-bold tracking-widest"
                  >
                    SEC_CORE
                  </text>
                </g>

                {/* 4. Render Category nodes */}
                {skillsData.map((cat, idx) => {
                  const coords = getCatCoords(idx);
                  const isSelected = selectedCat === cat.id;

                  return (
                    <g
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className="cursor-pointer group"
                    >
                      {/* Outer hovering ring */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="20"
                        fill="#030308"
                        stroke={isSelected ? cat.color : '#1e293b'}
                        strokeWidth="1.5"
                        className="transition-colors duration-300"
                      />
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="15"
                        fill={isSelected ? `${cat.color}15` : 'rgba(255,255,255,0.02)'}
                        className="transition-colors duration-300"
                      />
                      {/* Core anchor */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="4"
                        fill={isSelected ? cat.color : '#475569'}
                      />
                      
                      {/* Node Text Label (shortened / formatted) */}
                      <text
                        x={coords.x}
                        y={coords.y - 25}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#64748b'}
                        className={`font-mono text-[8px] font-semibold tracking-wide transition-colors duration-300`}
                      >
                        {cat.id.toUpperCase().replace('-', '_')}
                      </text>
                    </g>
                  );
                })}

                {/* 5. Render Orbiting Sub-skills nodes dynamically */}
                {activeCategoryIndex !== -1 && (
                  <>
                    {activeCategory.items.map((skill, sIdx) => {
                      const catCoords = getCatCoords(activeCategoryIndex);
                      const subAngle = (sIdx * (360 / activeCategory.items.length) * Math.PI) / 180;
                      const subX = catCoords.x + 55 * Math.cos(subAngle);
                      const subY = catCoords.y + 55 * Math.sin(subAngle);

                      return (
                        <motion.g
                          key={`sub-node-${sIdx}`}
                          initial={{ cx: catCoords.x, cy: catCoords.y, opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                        >
                          <circle
                            cx={subX}
                            cy={subY}
                            r="6"
                            fill="#030308"
                            stroke={activeCategory.color}
                            strokeWidth="1"
                          />
                          <circle cx={subX} cy={subY} r="3" fill={activeCategory.color} />
                          <text
                            x={subX}
                            y={subY + 14}
                            textAnchor="middle"
                            fill="#cbd5e1"
                            className="font-mono text-[7px]"
                          >
                            {skill.name}
                          </text>
                        </motion.g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
