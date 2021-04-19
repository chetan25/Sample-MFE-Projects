const HtmlWebpackPlugin =  require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
               './ProductsIndex': './src/bootstrap' // mapping bootstrap since we are exporting and mapping to index would not work
            },
            shared: [
                // this wil cause error if we load products directly without using bootstrap
                // if versions(major only if used like ^) are different than Plugin will load both versions fo faker
                'faker'
            ]
            // shared: {
            //     faker: {
            //         // this will make sure only one copy of faker is loaded
            //         // this is helpful when we have different versions of faker and we try to load in browser
            //         singleton: true
            //     }
            // } 
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]    
}