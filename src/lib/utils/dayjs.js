import dayjs from 'dayjs';
import isoWeekPlugin from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday'

/**
 * 获取日期格式
 * @param {*} date 
 * @returns 
 */
export const getDateString = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export default function configDayjs({
  isoWeek
} = {
  isoWeek: false,
}) {
  if (isoWeek) {
    dayjs.extend(isoWeekPlugin);
  }
  return dayjs;
}