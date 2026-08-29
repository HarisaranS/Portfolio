export interface ThemeColors {
  id: string;
  name: string;
  isDark: boolean;
  bg: string;
  surface: string;
  border: string;
  borderActive: string;
  accent: string;
  accentHover: string;
  accentSecondary: string;
  textPrimary: string;
  textMuted: string;
}

export const THEMES: Record<string, ThemeColors> = {
  black: {
    id: 'black',
    name: 'Midnight',
    isDark: true,
    bg: '#0a0a0f',
    surface: '#141420',
    border: 'rgba(255,255,255,0.08)',
    borderActive: 'rgba(139,92,246,0.5)',
    accent: '#8b5cf6',
    accentHover: '#a78bfa',
    accentSecondary: '#06b6d4',
    textPrimary: '#f1f5f9',
    textMuted: '#94a3b8',
  },
  white: {
    id: 'white',
    name: 'Clean',
    isDark: false,
    bg: '#ffffff',
    surface: '#f8fafc',
    border: 'rgba(0,0,0,0.06)',
    borderActive: 'rgba(15,23,42,0.4)',
    accent: '#0f172a',
    accentHover: '#334155',
    accentSecondary: '#2563eb',
    textPrimary: '#0f172a',
    textMuted: '#64748b',
  },
  lightGreen: {
    id: 'lightGreen',
    name: 'Emerald',
    isDark: false,
    bg: '#f0fdf4',
    surface: '#ffffff',
    border: 'rgba(22,163,74,0.12)',
    borderActive: 'rgba(22,163,74,0.4)',
    accent: '#16a34a',
    accentHover: '#15803d',
    accentSecondary: '#059669',
    textPrimary: '#14532d',
    textMuted: '#166534',
  },
  lightBlue: {
    id: 'lightBlue',
    name: 'Ocean',
    isDark: false,
    bg: '#f0f9ff',
    surface: '#ffffff',
    border: 'rgba(2,132,199,0.12)',
    borderActive: 'rgba(2,132,199,0.4)',
    accent: '#0284c7',
    accentHover: '#0369a1',
    accentSecondary: '#2563eb',
    textPrimary: '#0c4a6e',
    textMuted: '#0369a1',
  },
};
