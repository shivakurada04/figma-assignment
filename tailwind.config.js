/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neu-sm': '2px 2px 6px #1c1f21, -2px -2px 6px #2f3538',
        'neumorph': '8px 8px 16px #1c1f21, -8px -8px 16px #2f3538',
      },
    },
  },
  plugins: [],
};
