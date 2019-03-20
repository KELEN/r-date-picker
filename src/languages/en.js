export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: 'Mon',
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
}

export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
}

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

export default {
  ...WEEK_DAYS,
  ...CALENDAR_MONTHS
}