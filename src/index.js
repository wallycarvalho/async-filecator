const path = require('path');
const { readdirPromise, fstatPromise }  = require('./fs-promises');

const rootTestFolder = path.dirname(__dirname);

const asyncReaddir = async (inputArr, fileOpts, specOpts) => {
  const inputPath = inputArr.pop();
  const spec = specOpts || { ext: 'spec.js' };

  // folder with no child directories
  if (inputPath === undefined) return '';

  // read directory and list child items. Concatenate with current
  // inputPath to form full absolute path
  const list = (await readdirPromise(inputPath, fileOpts))
    .map(item => `${inputPath}/`.concat(item));

  // get stats for each item and separate into a new object by specific key
  const { directories, specs } = (await Promise.all(list.map(i => fstatPromise(i))))
    .reduce((acc, item) => {
      const filepath = item.file;

      if (item.isDirectory() === true) {
        acc.directories.push(filepath);
      } else if (filepath.includes(spec.ext)) {
        acc.specs.push(filepath);
      }

      return acc;
    }, { directories: [], specs: [] });

  return directories.length > 0 ? [ ...specs, ...(await asyncReaddir([...inputArr, ...directories])) ] : specs
};


module.exports = { asyncReaddir };
