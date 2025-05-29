"use client";
import type { Config } from "tailwindcss";

const config: Config = ({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
});

export default config;
