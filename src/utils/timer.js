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

export function dateDisabled(disabledDates, date) {
  return ~disabledDates.findIndex((item) => { return isSameDay(item, date) })
}

// 获取昨天的开始结束时间
export function getYesterday() {
  let date = []
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
  return date
}
// 获取最近七天的开始结束时间
export function getLast7Days() {
  let date = []
  date.push(moment().subtract('days', 7).format('YYYY-MM-DD'))
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
  return date
}
// 获取最近30天的开始结束时间
export function getLast30Days() {
  let date = []
  date.push(moment().subtract('days', 30).format('YYYY-MM-DD'))
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
  return date
}
// 获取上一周的开始结束时间
export function getLastWeekDays() {
  debugger
  let date = []
  let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
  let start = moment().subtract(weekOfday + 7, 'days').format('YYYY-MM-DD') // 周一日期
  let end = moment().subtract(weekOfday + 1, 'days').format('YYYY-MM-DD') // 周日日期
  date.push(start)
  date.push(end)
  return date
}
// 获取上一个月的开始结束时间
export function getLastMonthDays() {
  let date = []
  let start = moment().subtract('month', 1).format('YYYY-MM') + '-01'
  let end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD')
  date.push(start)
  date.push(end)
  return date
}
// 获取当前周的开始结束时间
export function getCurrWeekDays() {
  let date = []
  let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天 周日为一周中的第一天
  let start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周一日期
  let end = moment().add(7 - weekOfday - 1, 'days').format('YYYY-MM-DD') // 周日日期
  date.push(start)
  date.push(end)
  return date
}
// 获取当前月的开始结束时间
export function getCurrMonthDays() {
  let date = []
  let start = moment().add('month', 0).format('YYYY-MM') + '-01'
  let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD')
  date.push(start)
  date.push(end)
  return date
}