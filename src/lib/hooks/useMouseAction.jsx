/* eslint-disable no-param-reassign */
import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  isSameDay,
  isBetween,
  isBefore,
} from '@/utils/dayjs';
import {
  dateType,
} from '@/utils/prop-types';
import {
  isFunction,
} from '@/utils';

const MOUSE_DOWN_KEY = {
  LEFT: 1,
  MIDDLE: 2,
  RIGHT: 3,
};

/**
 * 单个日历操作
 * @param {*} param0
 * @returns
 */
const useMouseAction = ({
  calendarData = [],
  value = [],
  onChange,
  range = false,
  selectable = true,
  showOutside = true,
}) => {
  if (!range || !selectable) {
    return {
      calendarData,
    };
  }

  // 临时结束时间存储，如果value[0]，value[1]为空，可以展示连接动画
  const [tmpEndDate, setTmpEndDate] = useState(null);

  const dateEnterHandle = (cell) => {
    if (value[0] && !value[1]) {
      setTmpEndDate(cell.date);
    }
  };

  const dateLeaveHandle = () => {
    if (value[0] && !value[1]) {
      setTmpEndDate(null);
    }
  };

  const dateMouseDownHandle = (cell, ev) => {
    if (ev.nativeEvent.which === MOUSE_DOWN_KEY.LEFT) {
      if (!showOutside && !cell.inMonth) return;

      if (value[0] === undefined || (value[0] && value[1])) {
        value[0] = cell.date;
        value[1] = undefined;
        if (isFunction(onChange)) {
          onChange(value.slice());
        }
      } else if (value[0] && value[1] === undefined) {
        value[1] = cell.date;
        if (isBefore(value[1], value[0])) {
          value = [value[1], value[0]];
        }
        if (isFunction(onChange)) {
          onChange(value.slice());
        }
      }
    }
  };

  calendarData = React.useMemo(() => calendarData.map((row) => row.map((cell) => {
    cell.pickStart = isSameDay(value[0], cell.date);
    cell.pickEnd = isSameDay(value[1] || tmpEndDate, cell.date);
    cell.pickConnect = isBetween(cell.date, value[0], value[1] || tmpEndDate);
    return cell;
  })), [value, tmpEndDate]);

  return {
    calendarData,
    onDateEnter: dateEnterHandle,
    onDateLeave: dateLeaveHandle,
    onDateClick: dateMouseDownHandle,
  };
};

useMouseAction.propTypes = {
  onDateEnter: PropTypes.func,
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType),
  ]).isRequired,
};

useMouseAction.defaultProps = {
  onDateEnter: null,
  onDateLeave: null,
};

export default useMouseAction;
