const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./front-end/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: "./front-end/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    devServer: {
        port: 3001,
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/subpage/, to: '/index.html' },
                { from: /./, to: '/index.html' }
            ]
        },
        contentBase: path.resolve(__dirname, 'front-end'),
        inline: true
    },
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     loader: "file-loader",
            //     options: { name: '/static/[name].[ext]' }
            // }
        ]
    }
};
