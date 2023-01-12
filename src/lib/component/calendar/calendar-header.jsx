import React, {
  memo
} from 'react';
import {
  prefixClass,
} from '@/utils/style';
import {
  dateType,
} from '@/utils/prop-types';
import {
  getDateString,
} from '@/utils/dayjs';

const CalendarHeader = memo((props) => {
  const {
    defaultDate,
  } = props;

  return (
    <div className={prefixClass('calendar-header')}>
      { getDateString(defaultDate) }
    </div>
  );
});

CalendarHeader.displayName = "CalendarHeader";

CalendarHeader.propTypes = {
  /**
   * 默认日期
   */
  defaultDate: dateType.isRequired,
};

export default CalendarHeader;
