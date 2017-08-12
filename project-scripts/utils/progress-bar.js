/**
 * Created by zonebond on 2017/4/27.
 */

const chalk       = require('chalk');
const webpack     = require('webpack');
const progressbar = '>'.repeat(30);

module.exports = function progressing(config) {
  // progress bar
  const bar_length = progressbar.length;
  let last         = '';
  config.plugins.push(new webpack.ProgressPlugin(function handler(percentage, msg) {
    const mms = msg.split('/')[1];
    const idx = parseInt(percentage * bar_length);
    if (process.stdout.isTTY) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    }
    const bar = progressbar.substr(0, idx);
    process.stdout.write(`${chalk.green(bar)}${' '.repeat(bar_length - idx)} ~> ${chalk.inverse(' msg ')} ::: ${chalk.red(msg)}`);
    last = mms;
  }));
}