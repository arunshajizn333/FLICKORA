/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flickora-dark': '#0a0a1a',
        'flickora-card': '#0f0f1e',
        'flickora-input': '#1a1a2e',
        'flickora-purple': '#7c3aed',
        'flickora-violet': '#8b5cf6',
        'flickora-pink': '#ec4899',
      },
    },
  },
  plugins: [],
}