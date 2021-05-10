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
    defaultDate,
  } = props;

  return (
    <div className={prefixClass('calendar-header')}>
      { getDateString(defaultDate) }
    </div>
  );
});

CalendarHeader.propTypes = {
  defaultDate: dateType
};

export default CalendarHeader;
