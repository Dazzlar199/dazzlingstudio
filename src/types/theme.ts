export type ThemeMode = 'audio' | 'webdev' | null;

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  cardBg: string;
  gradient: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  name: string;
  icon: string;
}

export const audioTheme: Theme = {
  mode: 'audio',
  name: 'Audio Engineer',
  icon: '🎵',
  colors: {
    primary: '#D4AF37',        // Deep Gold
    secondary: '#1A237E',      // Rich Navy
    accent: '#FF8A65',         // Warm Orange
    background: '#FEFEFE',     // Cream White
    text: '#1A1A1A',          // Dark Gray
    textSecondary: '#666666',  // Medium Gray
    border: '#E0E0E0',        // Light Gray
    cardBg: '#FFFFFF',        // Pure White
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #FF8A65 100%)'
  }
};

export const webdevTheme: Theme = {
  mode: 'webdev',
  name: 'Web Developer',
  icon: '💻',
  colors: {
    primary: '#00FF88',        // Neon Green
    secondary: '#212121',      // Dark Charcoal
    accent: '#00B4FF',         // Electric Blue
    background: '#000000',     // Pure Black
    text: '#FFFFFF',          // White
    textSecondary: '#B0B0B0',  // Light Gray
    border: '#333333',        // Dark Gray
    cardBg: '#1A1A1A',        // Almost Black
    gradient: 'linear-gradient(135deg, #00FF88 0%, #00B4FF 100%)'
  }
};