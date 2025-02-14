const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    ]
};
