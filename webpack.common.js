const path = require('path')

const plugins = []

const config = {

    context: path.resolve(__dirname, './src'),

    entry: {
        lib: './ArcadeButton.js',
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
            }
        ]

    },
    plugins,
}

module.exports = config
