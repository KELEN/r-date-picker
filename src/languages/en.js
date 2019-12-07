export const WEEK_DAYS = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
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
  dcember: 'Dec',
};

export const COMMON = {
  year: '-',
  month: ' ',
  day: ' ',
};


export default {
  ...WEEK_DAYS,
  ...CALENDAR_MONTHS,
  ...COMMON,
};
