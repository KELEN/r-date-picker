import dayjs from 'dayjs';
import isoWeekPlugin from 'dayjs/plugin/isoWeek';
import chunk from 'lodash.chunk';

/**
 * 获取日期格式
 * @param {*} date
 * @returns
 */
export const getDateString = (date) => dayjs(date).format('YYYY-MM-DD');

/**
 * 获取日期二维数据
 * @param {*} month
 * @param {*} isoWeek 是否周一为一周的开始
 * @returns
 */
export const getDateArray = (month = dayjs().format('YYYY-MM-01'), isoWeek = false) => {
  const offsetIndex = isoWeek ? -1 : 0;

  const currentMonth = dayjs(dayjs(month).format('YYYY-MM-01'));

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startIndex = startOfMonth.day() + offsetIndex;
  const endIndex = endOfMonth.day() + offsetIndex;
  const daysInMonth = currentMonth.daysInMonth();

  const prependDates = [];
  for (let i = 1; i < startIndex + 1; i += 1) {
    prependDates.unshift({
      date: startOfMonth.subtract(i, 'day'),
      inMonth: false,
    });
  }

  const dates = [];
  for (let i = 0; i < daysInMonth; i += 1) {
    dates.push({
      date: startOfMonth.add(i, 'day'),
      inMonth: true,
    });
  }

  const appendDates = [];

  const rows = Math.floor((startIndex + daysInMonth) / 7);
  const MAX_ROW = 6; // 最大行数

  if (rows < MAX_ROW) {
    const diffRows = MAX_ROW - rows;
    const appendNum = diffRows * 7 - (endIndex + 1);
    for (let i = 1; i <= appendNum; i += 1) {
      appendDates.push({
        date: endOfMonth.add(i, 'day'),
        inMonth: false,
      });
    }
  }

  return chunk([...prependDates, ...dates, ...appendDates], 7);
};

export default dayjs;
