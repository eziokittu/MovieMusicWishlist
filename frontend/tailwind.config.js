/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: {
          light: "#ffffff",
          DEFAULT: "#ffffff",
          dark: "#000000",
        },
        two: {
          light: "#eeeeee",
          DEFAULT: "#eeeeee",
          dark: "#111111",
        },
        three: {
          light: "#111111",
          DEFAULT: "#111111",
          dark: "#eeeeee",
        },
        four: {
          light: "#000000",
          DEFAULT: "#000000",
          dark: "#ffffff",
        },
      },
      screens: {
        '2xsm': '300px',
        'xsm': '430px',
        'sm': '675px',
        'md': '810px',
        'lg': '1024px',
        'xl': '1325px',
        '2xl': '1600px',
      },
    },
  },
  plugins: [],
};
