'use strict'
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: ['whatwg-fetch',  './app.js'],
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
        publicPath: 'dist/'
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ],

    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".json", '.css']
    },
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js", ".json"],
        moduleExtensions: ['-loader', '*']
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {

        rules: [
            {
                // enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },

            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' },
        ]
    }
};
