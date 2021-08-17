"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.COMMON = exports.CALENDAR_MONTHS = exports.WEEK_DAYS = void 0;
var WEEK_DAYS = {
  Sunday: "Sun",
  Monday: 'Mon',
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
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
  year: '-',
  month: ' ',
  day: ' '
};
exports.COMMON = COMMON;

var _default = Object.assign({}, WEEK_DAYS, CALENDAR_MONTHS, COMMON);

exports["default"] = _default;