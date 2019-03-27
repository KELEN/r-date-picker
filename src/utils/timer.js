import moment from 'moment'

/**
 * check if same day
 * @param {*} a  moment object
 * @param {*} b  moment object
 */
export function isSameDay(a, b) {
  return a && b && moment(a).isSame(moment(b), 'day')
}

/**
 * check if same default props
 * @param {*} a 
 * @param {*} b 
 */
export function isSameDefaultDays(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (!isSameDay(a[i], b[i])) {
        return false
      }
    }
  } else {
    return isSameDay(a, b)
  }
}