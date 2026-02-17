import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const applyThemeToDom = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          applyThemeToDom(newTheme);
          return { theme: newTheme };
        });
      },

      setTheme: (theme) => {
        applyThemeToDom(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDom(state.theme);
        }
      },
    }
  )
);
