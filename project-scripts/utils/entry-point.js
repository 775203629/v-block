/**
 * Created by zonebond on 2017/4/27.
 */

// library
const path = require('path');
const fs   = require('fs');
const file = require('fs-extra');

// variable
const __src         = path.resolve('./src');
const ignores_regex = /DS_Store|assets/;
const directory     = fs.readdirSync(__src);
const folders       = directory.filter(f => !ignores_regex.test(f));

const EntryPoints = {};

Object.defineProperty(EntryPoints, 'Entries', {
  get: () => {
    return folders.map(folder => {
      return {entry: folder, uri: path.resolve(__src, folder)};
    });
  }
});

EntryPoints.LibraryExports = (paths) => {
  const entries = EntryPoints.Entries;
  while(entries.length){
    const {entry, uri} = entries.shift();
    file.copySync(`${uri}/exports.js`, `${paths.appBuild}/${entry}.js`, {dereference: true});
  }
};

module.exports = EntryPoints;