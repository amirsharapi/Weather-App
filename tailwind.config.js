module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  darkMode: 'media',
  theme: {
    fontFamily:{
      sans:['Roboto',"sans-serif"]
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
    },
    extend: {
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    },
  },
  plugins: [],
}
