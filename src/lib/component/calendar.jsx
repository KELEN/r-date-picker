import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames'
import {
  getDateString,
} from '../utils/dayjs';
import {
  prefixClassObject
} from '../utils/style';
import CalendarHeader from './calendar-header';
import CalendarWeek from './calendar-week'
import CalendarBody from './calendar-body';

const Calendar = props => {

  const {
    initialDate,
    className,
  } = props;

  const wrapCls = classNames({
    [className]: !!className,
    ...prefixClassObject({
      'calendar': true,
    })
  })

  return (
    <div className={wrapCls}>
      <CalendarHeader>{ getDateString(initialDate) }</CalendarHeader>
      <CalendarWeek />
      <CalendarBody />
    </div>
  )
}

Calendar.propTypes = {
  initialDate: PropTypes.string,
  className: PropTypes.string,
}

Calendar.defaultProps = {
  initialDate: dayjs().format('YYYY-MM-DD'),
  className: '',
}

export default Calendar
