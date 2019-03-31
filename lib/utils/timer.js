"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInRange = checkInRange;
exports.isSameDay = isSameDay;
exports.isSameDays = isSameDays;
exports.isDayBefore = isDayBefore;
exports.isDayAfter = isDayAfter;
exports.isMonthAfter = isMonthAfter;
exports.isMonthBefore = isMonthBefore;
exports.isSameMonth = isSameMonth;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getLastDayOfMonth = getLastDayOfMonth;
exports.dateDisabled = dateDisabled;
exports.getYesterday = getYesterday;
exports.getLast7Days = getLast7Days;
exports.getLast30Days = getLast30Days;
exports.getLastWeekDays = getLastWeekDays;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment.default);
/**
 * check date in ranges
 * @param ranges
 * @returns {Function}
 */

function checkInRange(ranges) {
  var mRanges = ranges.map(function (r) {
    return moment.range.apply(null, r);
  });
  return function (date) {
    var inRange = mRanges.find(function (range) {
      return range.contains(date);
    });
    return {
      isInRange: !!inRange,
      isRangeStart: Boolean(inRange && isSameDay(inRange.start, date)),
      isRangeEnd: Boolean(inRange && isSameDay(inRange.end, date))
    };
  };
}
/**
 * check if same day
 * @param {*} a  moment object
 * @param {*} b  moment object
 */


function isSameDay(a, b) {
  return Boolean(a && b && moment(a).isSame(moment(b), 'day'));
}
/**
 * check if same default props
 * @param {*} a
 * @param {*} b
 */


function isSameDays(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    for (var i = 0; i < a.length; i++) {
      if (!isSameDay(a[i], b[i])) {
        return false;
      }

      return true;
    }
  } else {
    return isSameDay(a, b);
  }
}
/**
 *
 * @param {*} start
 * @param {*} end
 */


function isDayBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'day'));
}
/**
 *
 * @param {*} start
 * @param {*} end
 */


function isDayAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'day'));
}
/**
 *
 * @param {*} start
 * @param {*} end
 */


function isMonthAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'month'));
}
/**
 *
 * @param {*} start
 * @param {*} end
 */


function isMonthBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'month'));
}
/**
 * is same month
 * @param {*} start
 * @param {*} end
 */


function isSameMonth(start, end) {
  return Boolean(start && end && start.isSame(end, 'month'));
}
/**
 * get the first day of month
 */


function getFirstDayOfMonth(date) {
  return date && moment(date).startOf('month');
}
/**
 * get the last day of month
 * @param {*} date
 */


function getLastDayOfMonth(date) {
  return date && moment(date).endOf('month');
}
/**
 * check if date is in disabled dates
 * @param disabledDates
 * @param date
 * @returns {boolean}
 */


function dateDisabled(disabledDates, date) {
  return Boolean(~disabledDates.findIndex(function (item) {
    return isSameDay(item, date);
  }));
}
/**
 * get yesterday
 * @returns {Array}
 */


function getYesterday() {
  var date = [];
  date.push(moment().subtract('days', 1).startOf('day'));
  date.push(moment().subtract('days', 1).endOf('day'));
  return date;
}
/**
 * get last 7 days
 * @returns {Array}
 */


function getLast7Days() {
  var date = [];
  date.push(moment().subtract('days', 7).startOf('day'));
  date.push(moment().subtract('days', 1).endOf('day'));
  return date;
}
/**
 * get last 30 days
 * @returns {Array}
 */


function getLast30Days() {
  var date = [];
  date.push(moment().subtract('days', 30).startOf('day'));
  date.push(moment().subtract('days', 1).endOf('day'));
  return date;
}
/**
 * get last week days
 * @returns {Array}
 */


function getLastWeekDays() {
  var date = [];
  var weekOfday = parseInt(moment().format('d'));
  var start = moment().subtract(weekOfday + 7, 'days').startOf('day');
  var end = moment().subtract(weekOfday + 1, 'days').endOf('day');
  date.push(start);
  date.push(end);
  return date;
}