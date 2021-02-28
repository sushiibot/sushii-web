const withTM = require("next-transpile-modules")(["@sushii-web/grapqhql"]);

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const nextConfig = {
    webpack: function (config) {
        config.resolve.plugins = [
            ...config.resolve.plugins,
            new TsconfigPathsPlugin(),
        ];

        return config;
    },
};

module.exports = withTM(nextConfig);
