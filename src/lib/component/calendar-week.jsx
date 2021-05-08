import React from 'react';
import PropTypes from 'prop-types';
import {
  weeks
} from '../utils/constants';

const CalendarWeek = props => {

  const {
    isoWeekDay,
    weeks,
  } = props;

  return (
    <div>
      {
        weeks.map(i => {
          <span key={i}>
            { i }
          </span>
        })
      }
    </div>
  )
}

CalendarWeek.propTypes = {
  // 
  isoWeek: isoWeekDay,
  weeks: PropTypes.arrayOf(),
}

CalendarWeek.defaultProps = {
  weeks: weeks,
}

export default CalendarWeek
