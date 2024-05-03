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
      },
      height: {
        128: "56rem",
      },
      colors: {
        "primary-text": "#E9E4DE",
        primary: {
          background: "#14293A",
          foreground: "#E9E4DE",
        },
        focus: "#14293A",
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
