export const WEEK_DAYS = {
  sunday: '日',
  monday: '一',
  tuesday: '二',
  wednesday: '三',
  thursday: '四',
  friday: '五',
  saturday: '六',
};

export const CALENDAR_MONTHS = {
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
  december: 'Dec',
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
