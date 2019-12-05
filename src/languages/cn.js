export const WEEK_DAYS = {
  Sunday: '日',
  Monday: '一',
  Tuesday: '二',
  Wednesday: '三',
  Thursday: '四',
  Friday: '五',
  Saturday: '六',
};

export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

export const COMMON = {
  year: '年',
  month: '月',
  day: '日',
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

export default {
  ...WEEK_DAYS,
  ...CALENDAR_MONTHS,
  ...COMMON,
};
