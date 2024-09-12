import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["Cabinet Grotesk", "sans-serif"],
      "general-sans": ["General Sans", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      agblack: "#030404",
      brblue: "#3C00DC",
      brred: "#FF5001",
      blue: "#3C00DC",
      agyellow: "#F5EB00",
      agwhite: "#FEFFFF",
      bgblue: "#3C00DC54",
      agorange: "#FF5001",
      successgreen: "#00B031",
      agpurple: "#8275A5",
    },
  },
  plugins: [],
};
export default config;
