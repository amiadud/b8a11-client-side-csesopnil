/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [
    require("daisyui"),
    require("tw-elements-react/dist/plugin.cjs")
  ],
}

