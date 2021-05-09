import React from 'react';
import PropTypes from 'prop-types';
import {
  weeks,
} from '../utils/constants';
import {
  prefixClass,
} from '../utils/style';

const CalendarWeek = (props) => {
  const {
    weeks,
  } = props;

  return (
    <div className={prefixClass('calendar-week')}>
      {
        weeks.map((i) => (
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
};

CalendarWeek.defaultProps = {
  weeks,
};

export default CalendarWeek;
