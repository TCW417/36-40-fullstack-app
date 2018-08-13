'use strict';

require('dotenv').config();

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    title: 'RA Mentor Test',
  }),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
    GOOGLE_OAUTH_ID: JSON.stringify(process.env.GOOGLE_OAUTH_ID),
  }),
];

webpackConfig.module = {};

webpackConfig.module.rules = [
  // {
  //   test: /\.(png|svg|jpg|gif|ttf)$/i,
  //   use: ['file-loader'],
  // },
  {
    test: /\.woff(2)?(\?[a-z0-9]+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  }, {
    test: /\.(ttf|eot|svg|png|jpg)(\?[a-z0-9]+)?$/,
    loader: 'file-loader',
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source'],
        cacheDirectory: true,
      },
    },
  },
];
