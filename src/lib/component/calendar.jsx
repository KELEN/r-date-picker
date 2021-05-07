import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './calendar-header';
import dayjs from 'dayjs';
import {
  getDateString,
} from '../utils/date'

const Calendar = props => {

  const {
    initialDate,
    className,
  } = props;

  return (
    <div className={className}>
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
