const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, '..', '/src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '..', '/dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '..', '/dist'),
        index: "index.html",
        port: 9000
    },
    mode: 'development',
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-jsx"]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: '../public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
              // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
              level: 11,
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
          }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
}