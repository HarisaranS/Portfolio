'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, THEMES } from '@/store/portfolioStore';
import { Shield, Radio, CheckCircle2, RefreshCw } from 'lucide-react';
import { sfx } from '@/utils/sfx';

export const CyberRadar: React.FC = () => {
  const { theme } = useStore();
  const t = THEMES[theme] || THEMES.clean;
  const [scanning, setScanning] = useState(false);
  const [nodes, setNodes] = useState([
    { id: 1, label: 'Wazuh SIEM', status: 'ONLINE', x: '30%', y: '40%', color: '#16a34a' },
    { id: 2, label: 'Velociraptor EDR', status: 'PROTECTED', x: '70%', y: '35%', color: '#2563eb' },
    { id: 3, label: 'Groq Llama-70B', status: 'READY', x: '55%', y: '75%', color: '#9333ea' },
    { id: 4, label: 'TryHackMe Target', status: 'AUDITED', x: '25%', y: '70%', color: '#dc2626' },
  ]);

  const handlePing = () => {
    sfx.playScan(true);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1500);
  };

  return (
    <div
      className="p-6 rounded-3xl border card-luxury relative overflow-hidden font-mono text-xs max-w-2xl mx-auto shadow-xl"
      style={{
        backgroundColor: t.surface,
        borderColor: t.border,
      }}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="font-bold tracking-wider" style={{ color: t.textPrimary }}>
            LIVE_CYBER_RADAR_SCANNER
          </span>
        </div>
        <button
          onClick={handlePing}
          className="px-3 py-1 rounded-xl bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <RefreshCw className={`w-3 h-3 ${scanning ? 'animate-spin' : ''}`} />
          <span>Ping Subnet</span>
        </button>
      </div>

      {/* Radar Graphic Container */}
      <div className="relative w-full h-48 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Concentric Radar Rings */}
        <div className="absolute w-40 h-40 rounded-full border border-emerald-500/20" />
        <div className="absolute w-28 h-28 rounded-full border border-emerald-500/30" />
        <div className="absolute w-16 h-16 rounded-full border border-emerald-500/40" />
        <div className="absolute w-full h-px bg-emerald-500/10" />
        <div className="absolute h-full w-px bg-emerald-500/10" />

        {/* Sweeping Radar Beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-0 origin-center"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.35) 0deg, transparent 60deg, transparent 360deg)',
          }}
        />

        {/* Target Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute flex items-center gap-1 z-10 group"
            style={{ left: node.x, top: node.y }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: node.color }} />
            <div className="hidden group-hover:block px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono">
              {node.label}: {node.status}
            </div>
          </div>
        ))}

        <div className="absolute bottom-2 left-3 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Radar Sweep Active · Subnet 192.168.1.0/24</span>
        </div>
      </div>
    </div>
  );
};
