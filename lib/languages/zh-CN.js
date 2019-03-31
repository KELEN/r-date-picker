"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CALENDAR_WEEKS = exports.COMMON = exports.CALENDAR_MONTHS = exports.WEEK_DAYS = void 0;

require("core-js/modules/es6.object.assign");

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
  day: '日' // Weeks displayed on calendar

};
exports.COMMON = COMMON;
var CALENDAR_WEEKS = 6;
exports.CALENDAR_WEEKS = CALENDAR_WEEKS;

var _default = Object.assign({}, WEEK_DAYS, CALENDAR_MONTHS, COMMON);

exports.default = _default;