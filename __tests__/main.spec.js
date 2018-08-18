import path from 'path';
import readdir from '../src';

test(' simple testing ', async () => {
  const test1 = await readdir([__dirname], { encoding: 'utf8'});

  expect(test1).toEqual([`${__dirname}/main.spec.js`]);
});
