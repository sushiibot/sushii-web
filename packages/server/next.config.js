module.exports = {
    async redirects() {
        return [
            {
                source: "/leaderboard/:guildId",
                destination: "/server/:guildId/leaderboard",
                permanent: false,
            },
        ];
    },
};
