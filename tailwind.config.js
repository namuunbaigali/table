/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",],
  theme: {
    container: {
      center: true,
      screens: {
        cl: "300px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {},
  },
  plugins: [],
}

