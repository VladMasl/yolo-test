const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ];

  if (isProduction) {
    plugins.push(new CleanWebpackPlugin());
  }

  return {
    mode: argv.mode || 'development',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3006,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    entry: {
      main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                sources: {
                  list: [
                    { tag: 'img', attribute: 'src', type: 'src' },
                    { tag: 'use', attribute: 'xlink:href', type: 'src' },
                  ],
                },
                minimize: true,
                esModule: false,
              },
            },
            {
              loader: 'posthtml-loader',
              options: {
                plugins: [
                  require('posthtml-include')({ root: path.join(__dirname, 'src') }),
                ],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'src/images'),
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                publicPath: '/images/',
                outputPath: 'images/',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
  };
};
