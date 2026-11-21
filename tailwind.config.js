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
        line: "#E2E8F1",
        lav: "#EAF2FF",
        white: "#FBFCFF"
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 55px rgba(10,31,75,.08)",
        "hero-visual": "0 12px 32px rgba(10,31,75,.08)",
        "card-hover": "0 7px 25px rgba(27,35,80,.06)",
        "member-shadow": "0 4px 16px rgba(3,78,235,.08)"
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "float-in": "floatIn 0.9s ease-out 0.15s backwards"
      },
      keyframes: {
        fadeInUp: {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        },
        floatIn: {
          "from": { opacity: "0", transform: "translateY(30px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        }
      },
      backgroundImage: {
        "gradient-hero": "radial-gradient(ellipse at 82% 27%, #eaf2ff 0%, transparent 44%), #f6f7fb",
        "gradient-blue-cyan": "linear-gradient(120deg, #034eeb, #03bafe)"
      },
      spacing: {
        "nav-height": "78px"
      }
    }
  },
  plugins: []
};
