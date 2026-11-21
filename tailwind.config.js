/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101A2D",
        navy: "#0A101F",
        muted: "#606D82",
        paper: "#F6F7FB",
        brand: "#034EEB",
        cyan: "#03BAFE",
        line: "#E2E8F1"
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 55px rgba(10,31,75,.08)"
      }
    }
  },
  plugins: []
};
