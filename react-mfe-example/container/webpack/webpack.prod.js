const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                'marketing': `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        })
    ]
}

// prodConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, prodConfig);