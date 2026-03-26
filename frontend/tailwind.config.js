/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#FF5E00", // Vibrant Orange
        primaryDark: "#E65500",
        vibrantOrange: "#FF5E00",
        vibrantYellow: "#FFB800",
        accentYellow: "#FFF200",
        lightOrange: "#FFF7ED",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}