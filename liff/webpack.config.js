const path = require('path');


module.exports = {
    entry: {
        'index': [
            path.join(__dirname, 'src/index.jsx')
        ]
    },
    output: {
        // 出力するファイル名
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/dist', 'js'),
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude:/node_modules/,
            use: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['.jsx','.js']
    },
};

