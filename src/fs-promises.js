import fs from 'fs';

const readdirPromise = (path, ...options) => new Promise((resolve, reject) => {
  fs.readdir(path, ...options, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});


const fstatPromise = file => new Promise((resolve, reject) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      reject(err);
    }
    /**
     * sending file name back along with file stats for
     * easy identification
     */
    resolve(Object.assign(stats, { file }));
  });
});


export { readdirPromise, fstatPromise };
