export const THEME = {
  colors: {
    primary: '#7553DB',
    secondary: '#34CB76',
    accent: '#FCBE25',
    background: '#0a0a0a',
    backgroundLight: '#1a1a1a',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.3)',
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
    },
    border: 'rgba(255, 255, 255, 0.15)',
    success: '#34CB76',
    warning: '#FCBE25',
    error: '#FF5252',
  },
  gradients: {
    primary: ['#7553DB', '#5a3fb8'] as const,
    secondary: ['#34CB76', '#28a85e'] as const,
    accent: ['#FCBE25', '#d9a11f'] as const,
    glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'] as const,
    glassReverse: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)'] as const,
    dark: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.3)'] as const,
  },
  fonts: {
    regular: 'System' as const,
    medium: 'System' as const,
    bold: 'System' as const,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '600' as const,
    bold: '700' as const,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
  blur: {
    light: 10,
    medium: 20,
    heavy: 40,
  },
} as const;

export type Theme = typeof THEME;