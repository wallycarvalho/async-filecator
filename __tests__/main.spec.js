const path = require('path')
const { recursiveReaddir } = require('../src');

test(' simple testing ', async () => {
  const test1 = await recursiveReaddir([__dirname], { encoding: 'utf8'});

  expect(test1).toEqual([`${__dirname}/main.spec.js`]);
});
