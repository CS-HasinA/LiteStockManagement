const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ["Roboto-Regular", ...defaultTheme.fontFamily.sans],
      display: ["Roboto-Light", ...defaultTheme.fontFamily.sans],
      mono: ["Roboto-Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontSize: {
        "extra-sm": ["0.5rem", ["1rem"]],
      },
      colors: {
        primary: "#FF6F61",
        success: "#678d58",
        fail: "#842029",
        "fail-light": "#cd323f",
        warning: "#664d03",
        lightgray: "lightgray",
      },
      fontFamily: {
        light: ["Roboto-Light", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        success: "#678d58",
      },

      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
};
