// Application constants

// Site configuration
export const SITE_CONFIG = {
  name: 'Rafid Rahman',
  title: 'Fullstack Developer',
  description: 'Fullstack developer passionate about building user-focused web applications using Next.js, React, and AI integrations.',
  url: 'https://rafid.me',
  author: 'Rafid Rahman',
  twitter: '@rafidrahman1',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/rafidrahman1',
  linkedin: 'https://linkedin.com/in/rafidrahman1',
  twitter: 'https://twitter.com/rafidrahman1',
  email: 'mailto:rafid@rafid.me',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Toast configuration
export const TOAST_CONFIG = {
  duration: 5000,
  position: 'top-right' as const,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  chat: '/api/chat',
} as const;

// GitHub configuration
export const GITHUB_CONFIG = {
  username: 'rafidrahman1',
  apiUrl: 'https://api.github.com',
} as const;

// Theme configuration
export const THEME_CONFIG = {
  defaultTheme: 'dark' as const,
  storageKey: 'theme',
} as const;
