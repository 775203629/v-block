/**
 * Created by zonebond on 2017/6/12.
 */
'use strict';
const path               = require('path');
const webpack            = require('webpack');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const progressing        = require('../utils');

module.exports = function (config) {
  config.cache = true;

  // Entries
  const entryPoints = config.entry;
  config.entry      = {
    common: './src/common/index.js',
    component: './src/component/index.js',
    net: './src/net/index.js'
  };

  // Output
  const output          = config.output;
  output.filename       = '[name].js';
  output.libraryTarget  = 'umd';
  output.umdNamedDefine = true;


  // Plugins
  const plugins = config.plugins;
  plugins.splice(1, 1);
  plugins.splice(2, 1); // remove uglifyjs plugin
  plugins.splice(4, 1);

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

  // Externals
  config.externals = ['react', 'react-dom', 'mobx', 'mobx-react', 'prop-types'];

  return true;
};