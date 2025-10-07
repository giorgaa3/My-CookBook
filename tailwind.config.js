/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        tomato: "#E64A32",
        basil: "#2BA36A",
        saffron: "#F5A524",
        charcoal: "#1F2937",
        offwhite: "#FAFAF9"
      },
      boxShadow: { card: "0 8px 24px rgba(0,0,0,0.08)" },
      borderRadius: { xl2: "1rem" }
    }
  },
  plugins: []
};
