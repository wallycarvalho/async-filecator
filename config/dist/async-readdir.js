!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.asyncReaddir=t():e.asyncReaddir=t()}(global,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){"use strict";r.d(t,"b",function(){return i}),r.d(t,"a",function(){return u});var n=r(1),o=r.n(n);const i=(e,...t)=>new Promise((r,n)=>{o.a.readdir(e,...t,(e,t)=>{e&&n(e),r(t)})}),u=e=>new Promise((t,r)=>{o.a.stat(e,(n,o)=>{n&&r(n),t(Object.assign(o,{file:e}))})})},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t,r){"use strict";r.r(t),function(e){var n=r(2),o=r.n(n),i=r(0);o.a.dirname(e);const u=async(e,t,r)=>{const n=e.pop(),o=r||{ext:"spec.js"};if(void 0===n)return"";const c=(await Object(i.b)(n,t)).map(e=>`${n}/`.concat(e)),{directories:s,specs:a}=(await Promise.all(c.map(e=>Object(i.a)(e)))).reduce((e,t)=>{const r=t.file;return!0===t.isDirectory()?e.directories.push(r):r.includes(o.ext)&&e.specs.push(r),e},{directories:[],specs:[]});return s.length>0?[...a,...await u([...e,...s])]:a};t.default=u}.call(this,"/")}])});