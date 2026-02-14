const path = require("path");

module.exports = {
   entry: './src/index.ts',
   //entry: './src/app.ts',
   //entry: './src/app1.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    mode: "development"
};