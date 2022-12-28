import React, {
  useState, useEffect,
} from 'react';
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
    value,
    range,
  } = props;

  const wrapCls = classNames({
    [className]: !!className,
  }, prefixClassObject({
    calendar: true,
  }));

  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const data = getDateArray(defaultDate, {
      isoWeek,
      min,
      max,
      value,
      range,
    });
    setCalendarData(data);
  }, [isoWeek, min, max, defaultDate, value, range]);

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
            'weeks',
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
  value: PropTypes.string,
  range: PropTypes.bool,
};

Calendar.defaultProps = {
  className: '',
  defaultDate: dayjs(),
  isoWeek: false,
  min: null,
  max: null,
  value: null,
  range: false,
};

export default Calendar;
