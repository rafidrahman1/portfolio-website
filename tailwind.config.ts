"use client";
import type { Config } from "tailwindcss";

const config: Config = ({
  darkMode: ["class", "class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-jetbrains-mono)',
  				'monospace'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(var(--card-foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'hsl(var(--popover-foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': 'hsl(var(--destructive-foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'sidebar-background': 'hsl(var(--sidebar-background))',
  			'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
  			'sidebar-primary': 'hsl(var(--sidebar-primary))',
  			'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  			'sidebar-accent': 'hsl(var(--sidebar-accent))',
  			'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  			'sidebar-border': 'hsl(var(--sidebar-border))',
  			'sidebar-ring': 'hsl(var(--sidebar-ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'pop-in': 'pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  			'pop-out': 'pop-out 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  			'tail-bounce': 'tail-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s both'
  		},
  		keyframes: {
  			'pop-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.3) translateY(-20px) rotate(-5deg)',
  					filter: 'blur(4px)'
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'scale(1.1) translateY(-5px) rotate(2deg)',
  					filter: 'blur(1px)'
  				},
  				'80%': {
  					opacity: '1',
  					transform: 'scale(0.95) translateY(2px) rotate(-1deg)',
  					filter: 'blur(0px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1) translateY(0) rotate(0deg)',
  					filter: 'blur(0px)'
  				}
  			},
  			'pop-out': {
  				'0%': {
  					opacity: '1',
  					transform: 'scale(1) translateY(0) rotate(0deg)',
  					filter: 'blur(0px)'
  				},
  				'50%': {
  					opacity: '0.5',
  					transform: 'scale(1.05) translateY(-5px) rotate(2deg)',
  					filter: 'blur(1px)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'scale(0.3) translateY(-20px) rotate(-5deg)',
  					filter: 'blur(4px)'
  				}
  			},
  			'tail-bounce': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-50%) scale(0) rotate(-10deg)'
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'translateY(-50%) scale(1.2) rotate(5deg)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(-50%) scale(1) rotate(0deg)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
});

export default config;
