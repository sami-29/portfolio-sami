/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*/*.{html,js}", "./index.html"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      16: "16px",
      24: "24px",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
