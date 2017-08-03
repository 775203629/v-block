/**
 * Created by zonebond on 2017/6/12.
 */
'use strict';

const path               = require('path');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function (config) {

  // Entries
  const entryPoints = config.entry;
  config.entry      = {
    index: [...entryPoints],
    common: './src/common',
    component: './src/component',
    net: './src/net'
  };

  // Output
  const output    = config.output;
  output.filename = '[name]/index.js';

  // Plugins
  const plugins             = config.plugins;
  plugins[1].options.chunks = ['index'];
  plugins.push(new CommonsChunkPlugin({
    names: ['common', 'component', 'net'],
    async: true,
  }));

  // Rules
  const rules = config.module.rules;

  rules[1].exclude.push([/\.less$/, /\.(eot|svg|ttf|woff|woff2)$/, /\.svg$/]);
  rules[1].options = {name: '[name].[ext]'};

  // add custom less
  rules.push({
    test: /\.less$/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    }, {
      loader: "less-loader" // compiles Less to CSS
    }]
  });

  // file-loader
  rules.push({
    test: /\.(eot|ttf|woff|woff2)$/,
    use: [{loader: 'file-loader', query: {name: 'public/fonts/[name].[ext]'}}]
  });

  // add custom svg loader-rule
  rules.push({
    test: /\.svg$/,
    use: [
      {loader: 'babel-loader'},
      {
        loader: 'react-svg-loader',
        query: {
          es5: true,
          svgo: {plugins: [{removeTitle: false}], floatPrecision: 2},
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  });

  // Babel
  rules[3].options.presets = ['react-app', 'stage-0'];
  rules[3].options.plugins = ['transform-decorators-legacy'];

  return false;
};
