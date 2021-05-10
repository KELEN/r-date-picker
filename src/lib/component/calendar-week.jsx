import React from 'react';
import PropTypes from 'prop-types';
import {
  weeks,
  isoWeeks,
} from '../utils/constants';
import {
  prefixClass,
} from '../utils/style';

const CalendarWeek = (props) => {
  const {
    weeks,
    isoWeek,
  } = props;

  const arr = isoWeek ? isoWeeks : weeks;

  return (
    <div className={prefixClass('calendar-week')}>
      {
        arr.map((i) => (
          <span key={i}>
            { i }
          </span>
        ))
      }
    </div>
  );
};

CalendarWeek.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.string),
  isoWeek: PropTypes.bool,
};

CalendarWeek.defaultProps = {
  weeks,
  isoWeek: false,
};

export default CalendarWeek;
