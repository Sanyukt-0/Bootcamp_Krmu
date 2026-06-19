/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#EDE9E1', // warm linen background — the "closet interior" tone
        ink: '#1F2421', // near-black warm charcoal for text & nav
        denim: '#36456B', // brand accent, nods to denim/wardrobe staples
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'], // editorial fashion-mag headers
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'], // garment care-label look for tags/labels
      },
    },
  },
  plugins: [],
};
