"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CALENDAR_WEEKS = exports.COMMON = exports.CALENDAR_MONTHS = exports.WEEK_DAYS = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WEEK_DAYS = {
  Sunday: "日",
  Monday: '一',
  Tuesday: "二",
  Wednesday: "三",
  Thursday: "四",
  Friday: "五",
  Saturday: "六"
};
exports.WEEK_DAYS = WEEK_DAYS;
var CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};
exports.CALENDAR_MONTHS = CALENDAR_MONTHS;
var COMMON = {
  year: '年',
  month: '月',
  day: '日'
}; // Weeks displayed on calendar

exports.COMMON = COMMON;
var CALENDAR_WEEKS = 6;
exports.CALENDAR_WEEKS = CALENDAR_WEEKS;

var _default = _objectSpread(_objectSpread(_objectSpread({}, WEEK_DAYS), CALENDAR_MONTHS), COMMON);

exports["default"] = _default;