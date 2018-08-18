'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));

var readdirPromise = function readdirPromise(path$$1) {
  for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    fs.readdir.apply(fs, [path$$1].concat(options, [function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    }]));
  });
};

var fstatPromise = function fstatPromise(file) {
  return new Promise(function (resolve, reject) {
    fs.stat(file, function (err, stats) {
      if (err) {
        reject(err);
      }
      /**
       * sending file name back along with file stats for
       * easy identification
       */
      resolve(Object.assign(stats, { file: file }));
    });
  });
};

var _this = undefined;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rootTestFolder = path.dirname(__dirname);

var recursiveReaddir = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(inputArr, fileOpts, specOpts) {
    var inputPath, spec, list, _reduce, directories, specs;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputPath = inputArr.pop();
            spec = specOpts || { ext: 'spec.js' };

            // folder with no child directories

            if (!(inputPath === undefined)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', '');

          case 4:
            _context.next = 6;
            return readdirPromise(inputPath, fileOpts);

          case 6:
            _context.t0 = function (item) {
              return (inputPath + '/').concat(item);
            };

            list = _context.sent.map(_context.t0);
            _context.next = 10;
            return Promise.all(list.map(function (i) {
              return fstatPromise(i);
            }));

          case 10:
            _context.t1 = function (acc, item) {
              var filepath = item.file;

              if (item.isDirectory() === true) {
                acc.directories.push(filepath);
              } else if (filepath.includes(spec.ext)) {
                acc.specs.push(filepath);
              }

              return acc;
            };

            _context.t2 = { directories: [], specs: [] };
            _reduce = _context.sent.reduce(_context.t1, _context.t2);
            directories = _reduce.directories;
            specs = _reduce.specs;

            if (!(directories.length > 0)) {
              _context.next = 26;
              break;
            }

            _context.t4 = [];
            _context.t5 = _toConsumableArray(specs);
            _context.t6 = _toConsumableArray;
            _context.next = 21;
            return recursiveReaddir([].concat(_toConsumableArray(inputArr), _toConsumableArray(directories)));

          case 21:
            _context.t7 = _context.sent;
            _context.t8 = (0, _context.t6)(_context.t7);
            _context.t3 = _context.t4.concat.call(_context.t4, _context.t5, _context.t8);
            _context.next = 27;
            break;

          case 26:
            _context.t3 = specs;

          case 27:
            return _context.abrupt('return', _context.t3);

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function recursiveReaddir(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = recursiveReaddir;
