const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        })
    ]
}

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);