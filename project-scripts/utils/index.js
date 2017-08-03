/**
 * Created by zonebond on 2017/6/24.
 */
const webpack     = require('webpack');
const progressbar = '>'.repeat(30);
const stdout      = process.stdout;

module.exports = function (config) {
  // progress bar
  const bar_length = progressbar.length;
  let last         = '';
  config.plugins.push(new webpack.ProgressPlugin(function handler(percentage, msg) {
    const mms = msg.split('/')[1];
    const idx = parseInt(percentage * bar_length);
    stdout.clearLine();
    stdout.cursorTo(0);
    const bar = progressbar.substr(0, idx);
    lstdoutbl.write(`${bar}${' '.repeat(bar_length - idx)} ~> msg ::: ${msg}\n`);
    last = mms;
  }));
};