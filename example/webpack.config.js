const plugins = [

]


const config = {

    entry: {
        bundle: './example.js'
    },

    output: {
        filename: '[name].js',
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
    },
    watch: true,

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
        ]

    },
    plugins,
}

module.exports = config
