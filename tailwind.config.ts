import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        custom: ['"Roboto"', 'sans-serif'], // Add the custom font (Roboto)
      },
      animation: {
        slideRightToLeft: "slideRightToLeft 10s linear infinite", // Adding the custom sliding animation
      },
      keyframes: {
        slideRightToLeft: {
          '0%': {
            transform: "translateX(100%)", // Starts from right
          },
          '100%': {
            transform: "translateX(-100%)", // Ends at left
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
