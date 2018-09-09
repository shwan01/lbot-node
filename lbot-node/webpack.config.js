const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
const mode = 'develop';

// bundleするファイル
const entries = [...glob.sync("./**/handler.ts")]
    .filter(handler => handler.indexOf('node_modules') === -1)
    .reduce((prev, path) => { prev[path.substring(0, path.lastIndexOf('.'))] = path; return prev }, {});

module.exports = {
    mode: mode,
    target: 'node',
    entry: entries,
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    externals: {
        'aws-sdk': 'aws-sdk'
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV' : JSON.stringify(env)
        // }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
