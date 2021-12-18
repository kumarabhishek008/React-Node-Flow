
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
     mode: 'development',
     devtool: 'inline-source-map',
     devServer: {
      contentBase: './build',
    },
     entry: './src/index.js',
     output: {
          path: path.resolve(__dirname, "build"),
          publicPath: '/',
        },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        },
     plugins: [
     new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src", "index.html")
     })
     ],
     module: {
          rules: [
            {
              test: /\.(sa|sc|c)ss$/,
              use: ["style-loader","css-loader","sass-loader"]
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            },
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: ["babel-loader"]
             },
          ]
        },
     optimization: {
     splitChunks: { chunks: "all" },
    minimize: true,
    //     minimizer: [
    //   new TerserPlugin({
    //     // sourceMap: true, // Must be set to true if using source-maps in production
    //     terserOptions: {
    //       compress: {
    //         // drop_console: true, // << this needs only to remove console.log //
    //       },
    //     },
    //   }),
    // ],
     },
}