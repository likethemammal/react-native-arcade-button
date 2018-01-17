const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const plugins = [
    new CopyWebpackPlugin([
        { from: 'example.html', to: 'index.html'}
    ])
]


const config = {

    context: path.resolve(__dirname, './src'),

    entry: {
        lib: './index.js',
        example: './example.js'
    },

    output: {
        filename: '[name].js',
        path:  path.resolve(__dirname, './bin'),
        publicPath: '/',

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
