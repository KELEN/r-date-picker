import React from 'react';
import PropTypes from 'prop-types';
import {
  prefixClass,
} from '@/utils/style';
import {
  dateType,
} from '@/utils/prop-types';
import {
  getDateString,
} from '@/utils/dayjs';

const CalendarHeader = React.memo((props) => {
  const {
    date,
  } = props;

  return (
    <div className={prefixClass('calendar-header')}>
      { getDateString(date) }
    </div>
  );
});

CalendarHeader.propTypes = {
  date: dateType
};

export default CalendarHeader;
