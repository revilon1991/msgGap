const path = require('path');

module.exports = {
    entry: './www/js/entry.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www/js')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules/'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};