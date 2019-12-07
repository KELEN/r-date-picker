"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.MODE = void 0;

function noop() {}

var MODE = {
  TIME: 'time',
  DATE: 'date',
  MONTH: 'month',
  YEAR: 'year'
};
exports.MODE = MODE;