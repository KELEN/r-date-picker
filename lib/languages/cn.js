"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CALENDAR_WEEKS = exports.COMMON = exports.CALENDAR_MONTHS = exports.WEEK_DAYS = void 0;
var WEEK_DAYS = {
  sunday: '日',
  monday: '一',
  tuesday: '二',
  wednesday: '三',
  thursday: '四',
  friday: '五',
  saturday: '六'
};
exports.WEEK_DAYS = WEEK_DAYS;
var CALENDAR_MONTHS = {
  january: 'Jan',
  february: 'Feb',
  march: 'Mar',
  april: 'Apr',
  may: 'May',
  june: 'Jun',
  july: 'Jul',
  august: 'Aug',
  september: 'Sep',
  october: 'Oct',
  november: 'Nov',
  december: 'Dec'
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

var _default = Object.assign({}, WEEK_DAYS, {}, CALENDAR_MONTHS, {}, COMMON);

exports["default"] = _default;