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
                    800: "#1f2735",
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
            fontSize: {
                xxs: ".6rem",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: colors.gray[200],
                        a: {
                            color: colors.blue[400],
                            "&:hover": {
                                color: colors.blue[300],
                            },
                        },
                        h1: {
                            color: colors.gray[200],
                            fontWeight: 400,
                        },
                        h2: {
                            color: colors.gray[200],
                            fontWeight: 400,
                        },
                        h3: {
                            color: colors.gray[200],
                            fontWeight: 400,
                        },
                        code: {
                            color: colors.gray[300],
                            background: colors.gray[800],
                            padding: ".1rem .25rem",
                            borderRadius: ".2rem",
                        },
                        "code::before": {
                            content: "",
                        },
                        "code::after": {
                            content: "",
                        },
                    },
                },
                discord: {
                    css: {
                        code: {
                            color: colors.gray[300],
                            background: colors.gray[800],
                            padding: ".1rem .25rem",
                            borderRadius: ".2rem",
                        },
                    },
                },
            },
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
            mono: [
                "ui-monospace",
                "SFMono-Regular",
                "Menlo",
                "Monaco",
                "Consolas",
                "Liberation Mono",
                "Courier New",
                "monospace",
            ],
        },
        zIndex: {
            "-10": "-10",
        },
    },
    variants: {
        extend: {
            inset: ["hover"],
            translate: ["active"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
