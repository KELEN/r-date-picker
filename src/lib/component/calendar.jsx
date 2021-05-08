import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames'
import CalendarHeader from './calendar-header';
import CalendarWeek from './calendar-week'
import {
  getDateString,
} from '../utils/dayjs';

const Calendar = props => {

  const {
    initialDate,
    className,
  } = props;

  const wrapCls = classNames({
    [className]: !className,
    'rdp__calendar': true,
  })

  return (
    <div className={wrapCls}>
      <CalendarHeader>{ getDateString(initialDate) }</CalendarHeader>
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
