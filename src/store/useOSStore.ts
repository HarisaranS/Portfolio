import { create } from 'zustand';

export type ThemeType = 'black' | 'white' | 'lightGreen' | 'lightBlue';

interface PortfolioStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeOrigin: { x: number; y: number } | null;
  setThemeWithOrigin: (theme: ThemeType, origin: { x: number; y: number }) => void;
}

export const useOSStore = create<PortfolioStore>((set) => ({
  theme: 'black',
  themeOrigin: null,
  setTheme: (theme: ThemeType) => set({ theme }),
  setThemeWithOrigin: (theme: ThemeType, origin: { x: number; y: number }) =>
    set({ theme, themeOrigin: origin }),
}));
