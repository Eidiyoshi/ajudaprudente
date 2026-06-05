module.exports = {
    theme: {
        extend: {
            colors: {
                purple: {
                    DEFAULT: "#6B21A8",
                    light: "#7C3AED",
                    bg: "#5B1A96",
                },
                yellow: {
                    DEFAULT: "#F5BC00",
                    dark: "#D18800",
                },
                dark: "#000000",
                dark2: "#111111",
                "gray-bg": "#f3f3f7",
                "card-border": "#e2e2ee",
                "text-main": "#1a1a2e",
                "text-muted": "#6b7280",
                "tag-purple-bg": "#ede9fe",
                "tag-purple-text": "#6B21A8",
            },
            fontFamily: {
                nunito: ["var(--font-nunito)", "sans-serif"], // ou apenas 'Nunito' se puxado globalmente
            },
        },
    },
};
