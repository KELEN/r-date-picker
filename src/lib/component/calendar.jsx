import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames';
import pick from 'lodash.pick';
import {
  getDateString,
} from '../utils/dayjs';
import {
  prefixClassObject,
} from '../utils/style';
import CalendarHeader from './calendar-header';
import CalendarWeek from './calendar-week';
import CalendarBody from './calendar-body';

const Calendar = (props) => {
  const {
    className,
    defaultDate,
    itemRender,
  } = props;

  const wrapCls = classNames({
    [className]: !!className,
    ...prefixClassObject({
      calendar: true,
    }),
  });

  return (
    <div className={wrapCls}>
      <CalendarHeader>{ getDateString(defaultDate) }</CalendarHeader>
      <CalendarWeek />
      <CalendarBody
        {
          ...pick(props, [
            'defaultDate',
            'itemRender',
          ])
        }
      />
    </div>
  );
};

Calendar.propTypes = {
  className: PropTypes.string,
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(dayjs),
  ]),
};

Calendar.defaultProps = {
  className: '',
  defaultDate: dayjs(),
};

export default Calendar;
