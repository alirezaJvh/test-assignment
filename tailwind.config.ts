import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      brand: {
        50: '#FFF4ED',
        100: '#FFE6D4',
        200: '#FFC9A8',
        300: '#FFA370',
        400: '#FF7137',
        500: '#FF5821',
        600: '#F03006',
        700: '#C72007',
        800: '#9E1B0E',
        900: '#7F1A0F',
        950: '#450905',
      },
      slate: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
      },
      neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0A0A0A',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D2D5DA',
        500: '#6D7280',
        600: '#4B5563',
      },
      red: {
        300: '#FCA5A5',
        600: '#DC2626',
      },
      white: '#FFF',
      black: '#000',
    },
    boxShadow: {
      field: '0px 0px 0px 4px rgba(100, 116, 139, 0.16)',
      focus: '0px 0px 0px 4px rgba(255, 88, 33, 0.16)',
      error: '0px 0px 0px 4px rgba(220, 38, 38, 0.16)',
      toggle: '0px 0px 1px 0px rgba(0, 0, 0, 0.24)',
      'drop-down': '0px 0px 8px 0px rgba(0, 0, 0, 0.24)',
    },
    animation: {
      'fade-out': 'fadeOut 0.2s ease-in forwards',
      'fade-in': 'fadeIn 0.2s ease-in forwards',
      'fade-in-name': 'fullNameField 0.3s ease-in forwards',
    },
  },
  plugins: [],
};
export default config;
