import dayjs from 'dayjs';

/**
 * 获取日期格式
 * @param {*} date 
 * @returns 
 */
export const getDateString = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}