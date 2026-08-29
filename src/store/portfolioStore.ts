import { create } from 'zustand';

export type ThemeType = 'clean' | 'slate' | 'emerald' | 'midnight';

export interface ThemeColors {
  id: ThemeType;
  name: string;
  isDark: boolean;
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderActive: string;
  accent: string;
  accentHover: string;
  accentSecondary: string;
  textPrimary: string;
  textMuted: string;
  glow: string;
  // Aliases for compatibility
  text: string;
  muted: string;
  accentB: string;
  surface2: string;
  codeText: string;
}

export const THEMES: Record<ThemeType, ThemeColors> = {
  clean: {
    id: 'clean',
    name: 'Clean White',
    isDark: false,
    bg: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    border: 'rgba(0, 0, 0, 0.08)',
    borderActive: 'rgba(15, 23, 42, 0.3)',
    accent: '#0f172a',
    accentHover: '#334155',
    accentSecondary: '#2563eb',
    textPrimary: '#0f172a',
    textMuted: '#64748b',
    glow: 'rgba(15, 23, 42, 0.1)',
    text: '#0f172a',
    muted: '#64748b',
    accentB: '#2563eb',
    surface2: '#f1f5f9',
    codeText: '#2563eb',
  },
  slate: {
    id: 'slate',
    name: 'Minimal Slate',
    isDark: false,
    bg: '#f1f5f9',
    surface: '#ffffff',
    surfaceHover: '#e2e8f0',
    border: 'rgba(15, 23, 42, 0.1)',
    borderActive: 'rgba(37, 99, 235, 0.4)',
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    accentSecondary: '#0284c7',
    textPrimary: '#0f172a',
    textMuted: '#475569',
    glow: 'rgba(37, 99, 235, 0.12)',
    text: '#0f172a',
    muted: '#475569',
    accentB: '#0284c7',
    surface2: '#e2e8f0',
    codeText: '#0284c7',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Studio',
    isDark: false,
    bg: '#f0fdf4',
    surface: '#ffffff',
    surfaceHover: '#dcfce7',
    border: 'rgba(22, 163, 74, 0.15)',
    borderActive: 'rgba(22, 163, 74, 0.4)',
    accent: '#16a34a',
    accentHover: '#15803d',
    accentSecondary: '#059669',
    textPrimary: '#14532d',
    textMuted: '#166534',
    glow: 'rgba(22, 163, 74, 0.12)',
    text: '#14532d',
    muted: '#166534',
    accentB: '#059669',
    surface2: '#dcfce7',
    codeText: '#059669',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Luxury',
    isDark: true,
    bg: '#090a0f',
    surface: '#12141d',
    surfaceHover: '#1a1d2b',
    border: 'rgba(255, 255, 255, 0.1)',
    borderActive: 'rgba(139, 92, 246, 0.5)',
    accent: '#8b5cf6',
    accentHover: '#a78bfa',
    accentSecondary: '#06b6d4',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    glow: 'rgba(139, 92, 246, 0.25)',
    text: '#f8fafc',
    muted: '#94a3b8',
    accentB: '#06b6d4',
    surface2: '#1a1d2b',
    codeText: '#a5f3fc',
  },
};

interface PortfolioStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeOrigin: { x: number; y: number } | null;
  setThemeWithOrigin: (theme: ThemeType, origin: { x: number; y: number }) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  theme: 'clean',
  themeOrigin: null,
  setTheme: (theme) => set({ theme }),
  setThemeWithOrigin: (theme, origin) => set({ theme, themeOrigin: origin }),
  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
}));
