module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anta': ['Anta', 'sans-serif'],
      },
      // backgroundColor: {
      //   'gradient-to-blue': '#4F93C0',
      //   'gradient-from-blue': '#667eea',
      // },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-linear': 'linear-gradient(to right, var(--tw-gradient-stops))',
      // },
      // gradientColorStops: {
      //   'blue': '#667eea',
      //   'lighterBlue': '#4F93C0',
      // },
    },
  },
  plugins: [],
}
