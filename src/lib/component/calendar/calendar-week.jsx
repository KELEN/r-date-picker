import React from 'react';
import PropTypes from 'prop-types';
import {
  weeks,
  isoWeeks,
} from '@/utils/constants';
import {
  prefixClass,
  prefixClassObject,
} from '@/utils/style';

const CalendarWeek = (props) => {
  const {
    weeks: customWeek,
    isoWeek,
    className,
  } = props;

  const arr = customWeek || (isoWeek ? isoWeeks : weeks);

  const wrapCls = prefixClassObject({
    'calendar-week': true,
    [className]: !!className,
  });

  return (
    <div className={wrapCls}>
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
  className: PropTypes.string,
};

CalendarWeek.defaultProps = {
  weeks,
  isoWeek: false,
  className: '',
};

export default CalendarWeek;
