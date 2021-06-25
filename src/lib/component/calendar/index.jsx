import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames';
import pick from 'lodash.pick';
import {
  getDateArray,
} from '@/utils/dayjs';
import {
  prefixClassObject,
} from '@/utils/style';
import {
  dateType,
} from '@/utils/prop-types';
import CalendarHeader from './calendar-header';
import CalendarWeek from './calendar-week';
import CalendarBody from './calendar-body';

const Calendar = (props) => {
  const {
    className,
    isoWeek,
    defaultDate,
    min,
    max,
  } = props;

  const wrapCls = classNames({
    [className]: !!className,
  }, prefixClassObject({
    calendar: true,
  }));

  const calendarData = getDateArray(defaultDate, {
    isoWeek,
    min,
    max,
  });

  return (
    <div className={wrapCls}>
      <CalendarHeader
        {
          ...pick(props, [
            'defaultDate',
          ])
        }
      />
      <CalendarWeek
        {
          ...pick(props, [
            'isoWeek',
          ])
        }
      />
      <CalendarBody
        {
          ...pick(props, [
            'value',
            'defaultDate',
            'itemRender',
            'isoWeek',
            'range',
            'showOutside',
            'min',
            'max',
          ])
        }
        calendarData={calendarData}
      />
    </div>
  );
};

Calendar.propTypes = {
  className: PropTypes.string,
  defaultDate: dateType,
  min: dateType,
  max: dateType,
  isoWeek: PropTypes.bool,
};

Calendar.defaultProps = {
  className: '',
  defaultDate: dayjs(),
  isoWeek: false,
  min: null,
  max: null,
};

export default Calendar;
