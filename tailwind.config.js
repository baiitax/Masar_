/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040B1C",
          900: "#061433",
          850: "#081A42",
          800: "#0B2B68",
          700: "#123E86",
          600: "#1E51A6",
          500: "#2F67C2",
        },
        gold: {
          700: "#8F6C2E",
          600: "#A98136",
          500: "#C2994B",
          400: "#D6B365",
          300: "#E6BE5E",
        },
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      boxShadow: {
        glass: "0 18px 50px -18px rgba(2, 8, 23, 0.55)",
        "glass-lg": "0 40px 90px -30px rgba(2, 8, 23, 0.65)",
        gold: "0 14px 40px -12px rgba(194, 153, 75, 0.45)",
        inset: "inset 0 1px 0 0 rgb(var(--line) / 0.9)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg, #E6BE5E 0%, #C2994B 45%, #A98136 100%)",
      },
      keyframes: {
        "route-dash": {
          to: { strokeDashoffset: "-220" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.7)", opacity: "0.9" },
          "80%": { transform: "scale(2.6)", opacity: "0" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "node-glow": {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "route-dash": "route-dash 6s linear infinite",
        "route-dash-slow": "route-dash 11s linear infinite",
        "pulse-ring": "pulse-ring 3.2s ease-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
        "node-glow": "node-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
