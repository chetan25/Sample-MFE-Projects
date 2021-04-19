const HtmlWebpackPlugin =  require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8082
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'carts',
            filename: 'remoteEntry.js',
            exposes: {
               './CartCount': './src/index' // mapping index since we are running the code directly on loading and not exporting
            },
            shared: [
                // this wil cause error if we load products directly without using bootstrap
                // if versions(major only if used like ^) are different than Plugin will load both versions fo faker
                'faker'
            ]
            // shared: {
            //     faker: {
            //         // this will make sure only one copy of faker is loaded
            //         // this is helpful when we have different versions of faker in different apps and we try to load in browser,
            //         // webpack will throw a warning in container app
            //         singleton: true
            //     }
            // }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]    
}