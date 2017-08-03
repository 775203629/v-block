/**
 * Created by zonebond on 2017/6/22.
 */
const chalk = require('chalk');

const mode = process.argv[2];
console.info(` ${chalk.green('MODE')} [ >> ${chalk.red(mode)} << ]`);

switch (mode){
  case 'start':
    require('./scripts/start');
    break;
  case 'build':
    require('./scripts/build');
    break;
  default:
    console.log('Please use [start, build] mode arguments');
    break;
}