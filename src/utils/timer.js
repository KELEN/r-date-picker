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