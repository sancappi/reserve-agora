/**@type {import("tailwindcss").Config}*/
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        "sm-h": { raw: "(max-height: 560px)" }, 
      },
    },
  },
  plugins: [],
};
