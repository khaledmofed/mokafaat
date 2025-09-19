/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#400198",
        secondary: "#1d0843",
        light: "#0077B6",
        title: "#2B2B2B",
        "sub-title": "#6B6B6B",
        success: "#27AE60",
        danger: "#E74C3C",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "nenu-regular": ["NeuePlakRegular"],
        "nenu-semi-bold": ["NeuePlakSemiBold"],
        "nenu-bold": ["NeuePlakBold"],
        "nenu-text-bold": ["NeuePlakTextBold"],
        "nenu-extended-regular": ["NeuePlakExtendedRegular"],
        "nenu-extended-bold": ["NeuePlakExtendedBold"],
        "nene-condensed-regular": ["NeuePlakCondensedRegular"],
        "nenu-condensed-bold": ["NeuePlakCondensedBold"],
        "readex-pro": ["Readex Pro", "sans-serif"],
        "ge-flow": ["Readex Pro", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      backgroundImage: {
        hero: "url('./assets/images/hero-image.jpg')",
        "who-are-we": "url('./assets/images/who-are-we.png')",
        map: "url('./assets/images/saudi-arabia-map.png')",
        "client-frame": "url('./assets/images/client-frame.svg')",
        "about-us": "url('./assets/images/about.png')",
        staff: "url('./assets/images/staff.svg')",
        "looking-for-job": "url('./assets/images/looking-for-job-bg.svg')",
        "looking-for-job-person":
          "url('./assets/images/looking-for-job-person.svg')",
        "business-registration":
          "url('./assets/images/business-registration-bg.svg')",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};
