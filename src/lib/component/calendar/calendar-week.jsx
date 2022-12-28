import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  weeks,
  isoWeeks,
} from '@/utils/constants';
import {
  prefixClassObject,
} from '@/utils/style';

const CalendarWeek = (props) => {
  const {
    weeks: customWeek,
    isoWeek,
    className,
    style,
  } = props;

  const arr = customWeek || (isoWeek ? isoWeeks : weeks);

  const wrapCls = classNames(className, prefixClassObject({
    'calendar-week': true,
  }));

  return (
    <div className={wrapCls} style={style}>
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
  style: PropTypes.shape(),
};

CalendarWeek.defaultProps = {
  weeks: null,
  isoWeek: false,
  className: '',
  style: null,
};

export default CalendarWeek;
