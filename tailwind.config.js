const colors = require("tailwindcss/colors");

module.exports = {
    purge: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media", // 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: colors.teal,
                gray: {
                    1000: "#0a0e14",
                    900: "#161d28",
                    800: "#232c3a",
                },
            },
            boxShadow: {
                DEFAULT:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.5)",
                md:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.6)",
            },
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
