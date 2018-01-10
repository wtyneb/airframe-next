//import path from 'path';
//import webpack from 'webpack';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = require('./../config');

var externals = fs
  .readdirSync(path.join(config.rootDir, 'node_modules'))
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {});

module.exports = {
    devtool: false,
    entry: ['babel-polyfill', path.join(config.srcServerDir, 'index.js')],
    output: {
        filename: 'server.js',
        path: config.distDir
    },
    target: 'async-node',
    node: {
        __filename: true,
        __dirname: true,
    },
    resolve: {
        modules: [
            'node_modules',
            config.srcDir
        ]
    },
    externals,
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractCssChunks(),
        //new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [config.srcServerDir, config.srcDir],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // Modular Styles
            {
                test: /\.css$/,
                use: ExtractCssChunks.extract({
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        },
                        { loader: 'postcss-loader' }
                    ]
                }),
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            {
                test: /\.scss$/,
                use: ExtractCssChunks.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                }),
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            // Global Styles
            {
                test: /\.css$/,
                use: ExtractCssChunks.extract({
                    use: ['css-loader', 'postcss-loader']
                }),
                include: [path.resolve(config.srcDir, 'styles')]
            },
            {
                test: /\.scss$/,
                use: ExtractCssChunks.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
                include: [path.resolve(config.srcDir, 'styles')]
            },
            /*
            {
                test: /\.css$/,
                use: [
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    { loader: 'postcss-loader' }
                ],
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ],
                exclude: [path.resolve(config.srcDir, 'styles')],
                include: [config.srcDir]
            },
            // Global Styles
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader'],
                include: [path.resolve(config.srcDir, 'styles')]
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'postcss-loader', 'sass-loader'],
                include: [path.resolve(config.srcDir, 'styles')]
            },*/
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
            
        ]
    }
}