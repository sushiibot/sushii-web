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
                amber: colors.amber,
                blue: {
                    300: "#59affb",
                    400: "#3fa1f8",
                    500: "#2a95f3",
                    600: "#1a89ea",
                    700: "#0e7ad8",
                },
                gray: {
                    1000: "#05090F",
                    900: "#101113",
                    800: "#0E121A",
                    750: "#161C27",
                    700: "#1F2124",
                    600: "#2C2F33",
                    500: "#3D4146",
                    300: "#737880",
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
                "1/3": "33%",
                "1/2": "50%",
            },
            height: {
                "screen-90": "90vh",
            },
            fontSize: {
                xxs: ".6rem",
            },
            padding: {
                0.25: ".1rem",
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
            "-5": "-5",
            "-10": "-10",
            "-20": "-20",
            "-30": "-30",
            "-40": "-40",
            "-50": "-50",
        },
    },
    variants: {
        extend: {
            inset: ["hover"],
            animation: ["group-hover"],
            translate: ["active", "group-hover", "checked"],
            backgroundColor: ["disabled", "even"],
            textColor: ["disabled"],
            cursor: ["disabled"],
            display: ["group-hover"],
            borderRadius: ["first", "last"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
