/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'default':'#EDEDED',
        'boundary':'#333333',
      },
      zIndex:{
        'modal-background':'998',
        'modal':'999'
      }
    },
  },
  plugins: [],
}

