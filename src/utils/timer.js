import moment from 'moment'

/**
 * check if same day
 * @param {*} a  moment object
 * @param {*} b  moment object
 */
export function isSameDay(a, b) {
  return Boolean(a && b && moment(a).isSame(moment(b), 'day'))
}

/**
 * check if same default props
 * @param {*} a
 * @param {*} b
 */
export function isSameDays(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (!isSameDay(a[i], b[i])) {
        return false
      }
      return true
    }
  } else {
    return isSameDay(a, b)
  }
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isDayBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'day'))
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isDayAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'day'))
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isMonthAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'month'))
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isMonthBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'month'))
}

/**
 * is same month
 * @param {*} start
 * @param {*} end
 */
export function isSameMonth(start, end) {
  return Boolean(start && end && start.isSame(end, 'month'))
}

/**
 * get the first day of month
 */
export function getFirstDayOfMonth(date) {
  return date && moment(date).startOf('month')
}

/**
 * get the last day of month
 * @param {*} date
 */
export function getLastDayOfMonth(date) {
  return date && moment(date).endOf('month')
}

/**
 * check if date is in disabled dates
 * @param disabledDates
 * @param date
 * @returns {boolean}
 */
export function dateDisabled(disabledDates, date) {
  return Boolean(~disabledDates.findIndex((item) => {
    return isSameDay(item, date)
  }))
}

/**
 * get yesterday
 * @returns {Array}
 */
export function getYesterday() {
  let date = []
  date.push(moment().subtract('days', 1).startOf('day'))
  date.push(moment().subtract('days', 1).endOf('day'))
  return date
}

/**
 * get last 7 days
 * @returns {Array}
 */
export function getLast7Days() {
  let date = []
  date.push(moment().subtract('days', 7).startOf('day'))
  date.push(moment().subtract('days', 1).endOf('day'))
  return date
}

/**
 * get last 30 days
 * @returns {Array}
 */
export function getLast30Days() {
  let date = []
  date.push(moment().subtract('days', 30).startOf('day'))
  date.push(moment().subtract('days', 1).endOf('day'))
  return date
}

/**
 * get last week days
 * @returns {Array}
 */
export function getLastWeekDays() {
  let date = []
  let weekOfday = parseInt(moment().format('d'))
  let start = moment().subtract(weekOfday + 7, 'days').startOf('day')
  let end = moment().subtract(weekOfday + 1, 'days').endOf('day')
  date.push(start)
  date.push(end)
  return date
}
