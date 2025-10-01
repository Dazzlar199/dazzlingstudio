'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeMode, Theme, audioTheme, webdevTheme } from '@/types/theme';

interface ThemeContextType {
  currentTheme: Theme | null;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getCurrentTheme = useCallback((): Theme | null => {
    if (themeMode === 'audio') return audioTheme;
    if (themeMode === 'webdev') return webdevTheme;
    return null;
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    if (mode === themeMode) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setThemeModeState(mode);
      setIsTransitioning(false);
    }, 100);
  };

  useEffect(() => {
    const theme = getCurrentTheme();
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.colors.primary);
      document.documentElement.style.setProperty('--secondary', theme.colors.secondary);
      document.documentElement.style.setProperty('--accent', theme.colors.accent);
      document.documentElement.style.setProperty('--background', theme.colors.background);
      document.documentElement.style.setProperty('--text', theme.colors.text);
      document.documentElement.style.setProperty('--text-secondary', theme.colors.textSecondary);
      document.documentElement.style.setProperty('--border', theme.colors.border);
      document.documentElement.style.setProperty('--card-bg', theme.colors.cardBg);
      document.documentElement.style.setProperty('--gradient', theme.colors.gradient);
    }
  }, [getCurrentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: getCurrentTheme(),
        themeMode,
        setThemeMode,
        isTransitioning,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}