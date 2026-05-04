// Non-CMS app constants (editable site copy lives in content/portfolio.json)

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

export const TOAST_CONFIG = {
  duration: 5000,
  position: "top-right" as const,
};

export const API_ENDPOINTS = {
  contact: "/api/contact",
  chat: "/api/chat",
} as const;

export const THEME_CONFIG = {
  defaultTheme: "dark" as const,
  storageKey: "theme",
} as const;
