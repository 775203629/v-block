/**
 * Created by zonebond on 2017/6/12.
 */
'use strict';
const path        = require('path');
const webpack     = require('webpack');
const progressBar = require('../utils/progress-bar');
const EntryPoints = require('../utils/entry-point');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(config) {

  // Progress Bar
  progressBar(config);

  // Entries
  const entries  = EntryPoints.Entries;
  const polyfill = path.resolve('node_modules/react-scripts/config/polyfills.js');
  config.entry   = entries.reduce((acc, {entry, uri}) => {
    acc[entry] = [polyfill, uri];
    return acc;
  }, {});

  // Output
  const output          = config.output;
  output.filename       = '[name].js';
  output.libraryTarget  = 'umd';
  output.umdNamedDefine = true;

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
    use: [{
      loader: 'svg-react-loader',
      options: {
        filters: [function(value) {
          delete value['t'];
          delete value['pId'];
          this.update(value)
        }]
      }
    }]
  });

  // Babel
  rules[3].options.presets = ['react-app', 'stage-0'];
  rules[3].options.plugins = ['transform-decorators-legacy'];

  // Externals
  config.externals = ['react', 'react-dom', 'mobx', 'mobx-react', 'prop-types', 'axios', 'quill'];

  // Plugins
  const plugins = config.plugins;

  // remove html-webpack-plugin
  plugins.splice(1, 1);

  // re-conf UglifyJS :: NO-Uglify entry-point files
  plugins[2] = new UglifyJSPlugin({
    parallel: true,
    sourceMap: false,
    uglifyOptions: {
      compress: { warnings: false, comparisons: false, drop_debugger: true, keep_fnames: true},
      output: { comments: false}
    }
  });
  // const ens_index = entries.map(({entry}) => `${entry}/index`).join('|');

  // remove manifest-plugin
  plugins.splice(4, 1);

  // test-non-uglifyJS
  //plugins.splice(2, 1);

  //console.log(plugins[2].options);

  
  return true;
};
