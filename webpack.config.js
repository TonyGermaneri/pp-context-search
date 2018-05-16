const path = require('path');
module.exports = {
    entry: './lib/main.js',
    output: {
        filename: 'pp-context-search.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /lib\/\.js$/,
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
