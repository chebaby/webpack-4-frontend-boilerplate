const path                    = require('path');
const merge                   = require('webpack-merge');
const CleanWebpackPlugin      = require('clean-webpack-plugin');
const webpackConfig           = require('./webpack.config');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin           = require('workbox-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');


const pathDest   = path.join(__dirname, 'dist');
const pathAssets = path.join(__dirname, 'assets');

const swDest     = path.join(pathDest, 'sw.js');
const swSrc      = path.join(pathAssets, 'scripts', 'sw.js');


module.exports = merge(webpackConfig, {

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    plugins: [

        new CleanWebpackPlugin(['dist']),


        new CopyWebpackPlugin([{

            from: path.join(pathAssets, 'manifest.json'),
            to: path.join(pathDest, 'manifest.json')

        }], { debug: true}),


        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),

        new OptimizeCssAssetsPlugin({

            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),

        // use this to generate service worker
        // new WorkboxPlugin.GenerateSW({

        //     swDest: swDest,
        //     clientsClaim: true,
        //     skipWaiting: true,
        // })

        // use this to customize the service worker
        // i.e: register routes, applying stratigies
        new WorkboxPlugin.InjectManifest({

            swSrc: swSrc,
            swDest: swDest
        })
    ]

});
