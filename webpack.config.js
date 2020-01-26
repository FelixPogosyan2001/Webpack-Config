const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const currentOpt = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        currentOpt.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCss()
        ]
    }

    return currentOpt;
}

const cssLoader = (processer) => {
    const config = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ];

    if (processer) {
        config.push(processer)
    }

    return config;
}

const babelSettings = (preset) => {
    const settings = [{
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
        } 
    }];

    if (preset) {
        settings[0].options.presets.push(preset);
    }
    
    return settings;
}

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        additional: './counter.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['.js','.json'],
        alias: {
            '@': path.resolve(__dirname,'src'),
            '@css': path.resolve(__dirname,'src/css')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 2001
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname,'src/favicon.ico'),to: path.resolve(__dirname,'dist')}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.less$/,
                use: cssLoader('less-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff)$/,
                use: ['file-loader']
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: babelSettings()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: babelSettings('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node-modules/,
                use: babelSettings('@babel/preset-react')
            }
        ]
    }
}