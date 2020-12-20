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
                orange: colors.orange,
                gray: {
                    1000: "#0a0e14",
                    900: "#161d28",
                    800: "#232c3a",
                },
                discord: {
                    dark: "#36393f",
                    darken: "rgba(4, 4, 5, 0.07)",
                    code: "#2f3136",
                    "bot-badge": "#7289da",
                },
            },
            boxShadow: {
                DEFAULT:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.5)",
                md:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.6)",
            },
            maxWidth: {
                "1/2": "50%",
            },
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
    },
    variants: {
        extend: {
            inset: ["hover"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
