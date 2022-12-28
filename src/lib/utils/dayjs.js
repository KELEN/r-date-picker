import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import chunk from 'lodash.chunk';

dayjs.extend(isBetweenPlugin);

/**
 * 获取日期格式
 * @param {*} date
 * @returns
 */
export const getDateString = (date) => dayjs(date).format('YYYY-MM-DD');

/**
 * 获取月格式
 * @param {*} date
 * @returns
 */
export const getMonthString = (date) => dayjs(date).format('YYYY-MM');

/**
 * 判断是否是同一天
 */
export const isSameDay = (d1, d2) => d1 && d2 && dayjs(d1).isSame(dayjs(d2), 'day');

/**
 * 是否在日期d1和d2之间
 */
export const isBetween = (d, d1, d2, opts) => d1 && d2 && dayjs(d).isBetween(d1, d2, 'day', opts);

/**
 * d1 是否在 d2 之前
 * @param {*} d1
 * @param {*} d2
 * @returns
 */
export const isBefore = (d1, d2) => d1 && d2 && dayjs(d1).isBefore(d2);

/**
 * 检测日期是否可用
 * @param {*} date
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const checkDisabled = (date, min, max) => (min && dayjs(date).isBefore(min, 'day'))
  || (max && dayjs(date).isAfter(max, 'day'));

/**
 * 获取日期二维数据
 * @param {*} month
 * @param {*} isoWeek 是否周一为一周的开始
 * @returns
 */
export const getDateArray = (month = dayjs().format('YYYY-MM-01'), {
  max,
  min,
  isoWeek = false,
  range,
  value,
  hoveringDate, // 鼠标悬浮日期，在选择范围的时候，需要用到
} = {}) => {
  const offsetIndex = isoWeek ? 0 : 1;

  const currentMonth = dayjs(dayjs(month).format('YYYY-MM-01'));

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startIndex = (startOfMonth.day() === 0 ? 7 : startOfMonth.day()) + offsetIndex;
  const endIndex = (endOfMonth.day() === 0 ? 7 : endOfMonth.day()) + offsetIndex;
  const daysInMonth = currentMonth.daysInMonth();

  // 单个选中
  const checkSelected = (date) => !range && isSameDay(date, value);

  // 是否开始
  const checkPickStart = (date) => {
    if (!range) {
      return false;
    }
    if (hoveringDate && isBefore(hoveringDate, value[0])) {
      return false;
    }
    return value[0] && isSameDay(date, value[0]);
  };

  const checkPickConnect = (date) => {
    if (!range) return false;
    if (isBetween(date, value[0], value[1])) {
      return true;
    }
    if (value[0] && !value[1] && hoveringDate && isBetween(date, value[0], hoveringDate, '(]')) {
      return true;
    }
    return false;
  };

  const checkPickEnd = (date) => {
    if (!range) {
      return false;
    }
    if (hoveringDate) {
      if (isBefore(hoveringDate, value[0]) && isSameDay(value[0], date)) {
        return true;
      }
    }
    return value[0] && isSameDay(value[1], date);
  };

  const prependDates = [];
  for (let i = 1; i < startIndex; i += 1) {
    const date = startOfMonth.subtract(i, 'day');
    prependDates.unshift({
      date,
      dateStr: date.format('YYYY-MM-DD'),
      inMonth: false,
      selected: checkSelected(date), // 只有一个日期
      pickStart: checkPickStart(date),
      pickConnect: checkPickConnect(date),
      pickEnd: checkPickEnd(date),
      disabled: checkDisabled(date, min, max),
    });
  }

  const dates = [];
  for (let i = 0; i < daysInMonth; i += 1) {
    const date = startOfMonth.add(i, 'day');
    dates.push({
      date,
      dateStr: date.format('YYYY-MM-DD'),
      inMonth: true,
      selected: checkSelected(date), // 只有一个日期
      pickStart: checkPickStart(date),
      pickConnect: checkPickConnect(date),
      pickEnd: checkPickEnd(date),
      disabled: checkDisabled(date, min, max),
    });
  }

  const appendDates = [];
  const TOTAL_COUNT = 6 * 7; // 最大行数

  const currentCount = (startIndex + daysInMonth - 1);

  if (currentCount < TOTAL_COUNT) {
    const appendNum = TOTAL_COUNT - currentCount;
    for (let i = 1; i <= appendNum; i += 1) {
      const date = endOfMonth.add(i, 'day');
      appendDates.push({
        date,
        dateStr: date.format('YYYY-MM-DD'),
        inMonth: false,
        selected: checkSelected(date), // 只有一个日期
        pickStart: checkPickStart(date),
        pickConnect: checkPickConnect(date),
        pickEnd: checkPickEnd(date),
        disabled: checkDisabled(date, min, max),
      });
    }
  }

  return chunk([...prependDates, ...dates, ...appendDates], 7);
};

export default dayjs;
