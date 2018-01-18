const path = require('path')

const plugins = []

const config = {

    context: path.resolve(__dirname, './src'),

    entry: {
        lib: './index.js',
    },

    output: {
        filename: '[name].js',
        path:  path.resolve(__dirname, './bin'),

        library: 'ArcadeButton',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader',
                    'source-map-loader',
                ],
            },
            {
                test: /\.json$/,
                use: ["json-loader"],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(svg)$/,
                use: ['raw-loader'],
                exclude: /(node_modules)/,
            }
        ]

    },
    plugins,
}

module.exports = config
