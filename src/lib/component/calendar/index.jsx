import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames';
import pick from 'lodash.pick';
import {
  getDateString,
  getDateArray,
} from '@/utils/dayjs';
import {
  prefixClassObject,
} from '@/utils/style';
import {
  dateType
} from '@/utils/prop-types';
import CalendarHeader from './calendar-header';
import CalendarWeek from './calendar-week';
import CalendarBody from './calendar-body';

const Calendar = (props) => {
  const {
    className,
    defaultDate,
    itemRender,
    isoWeek,
  } = props;

  const wrapCls = classNames({
    [className]: !!className,
  }, prefixClassObject({
    calendar: true,
  }));

  const calendarData = getDateArray(defaultDate, isoWeek);

  return (
    <div className={wrapCls}>
      <CalendarHeader 
        {
          ...pick(props, [
            'date'
          ])
        }
      />
      <CalendarWeek 
        {
          ...pick(props, [
            'isoWeek'
          ])
        }
      />
      <CalendarBody
        {
          ...pick(props, [
            'defaultDate',
            'itemRender',
            'isoWeek'
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
};

Calendar.defaultProps = {
  className: '',
  defaultDate: dayjs(),
};

export default Calendar;
