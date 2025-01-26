/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "zesta-regular": "Zesta_Regular",
        "zesta-bold": "Zesta_Bold",
        cocogothic: "CocoGothic",
      },
      colors: {
        primary: "#8C2851",
        "lt-primary": "#9c6079",
        "lt-secondary": "#CEDBE5",
      },
      width: {
        icon: "2rem",
      },
      padding: {
        bdr: "10rem",
      },
      fontSize: {
        flash: [
          "1.875rem",
          {
            fontWeight: "900",
            lineHeight: "2.5rem",
            letterSpacing: "0.5rem",
          },
        ],
        title: [
          "1.5rem",
          {
            fontWeight: "700",
          },
        ],
        button: [
          "1.125rem",
          {
            fontWeight: "400",
            letterSpacing: "0.5rem",
          },
        ],
        content: [
          "1rem",
          {
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
