const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dog-back": "url('/house_back.png')",
        "login-back": "url('/loginback.png')",
      },
      height: {
        128: "56rem",
      },
      colors: {
        "primary-text": "#E9E4DE",
        primary: {
          DEFAULT: "#14293A",
        },
        secondary: {
          DEFAULT: "#38383d",
        },
        brand: {
          50: "#E1ECF5",
          100: "#CEDFEE",
          200: "#AFCCE4",
          300: "#8DB6D8",
          400: "#6FA3CD",
          500: "#4D8DC2",
          600: "#3B78AB",
          700: "#2F6089",
          800: "#254B6A",
          900: "#1A354C",
          950: "#14293A",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              background: "#14293A",
              foreground: "#E9E4DE",
            },
            focus: "#99ABC1",
          },
        },
      },
    }),
  ],
};
