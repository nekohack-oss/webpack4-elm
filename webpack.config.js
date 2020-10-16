const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: ['elm-webpack-loader'],
            },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: ['style-loader', 'css-loader']
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.elm'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
        }),
    ],

    devServer: {
        contentBase: __dirname + 'src/assets',
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        before(app) {
            app.get('/test', function (req, res) {
                res.json({
                    result: 'OK',
                })
            })
        },
    },
}
