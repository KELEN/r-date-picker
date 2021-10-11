/* eslint-disable no-param-reassign */
import React, {
  useState,
  useCallback,
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
import { isFunction } from '@/utils';

const MOUSE_DOWN_KEY = {
  LEFT: 1,
  MIDDLE: 2,
  RIGHT: 3,
};

/**
 * 多个日历操作
 * @param {*} param0
 * @returns
 */
const usePickerAction = ({
  months = [],
  value = [],
  onChange,
  range = false,
  selectable = true,
}) => {
  if (!range || !selectable) {
    return {
      months,
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

  const dateMouseDownHandle = useCallback((cell, ev) => {
    if (ev.nativeEvent.which === MOUSE_DOWN_KEY.LEFT) {
      if (cell.disabled || !isFunction(onChange)) return;

      if (value[0] === undefined || (value[0] && value[1])) {
        value[0] = cell.date;
        value[1] = undefined;
        setTmpEndDate(cell.date);
        onChange(value.slice());
      } else if (value[0] && value[1] === undefined) {
        value[1] = cell.date;
        if (isBefore(value[1], value[0])) {
          value = [value[1], value[0]];
        }
        setTmpEndDate(null);
        onChange(value.slice());
      }
    }
  }, [value]);

  months = React.useMemo(() => months.map((month) => ({
    month: month.month,
    data: month.data.map((row) => row.map((cell) => {
      const start = value[0];
      const end = value[1] || tmpEndDate;
      let ranges = [start, end];
      if (isBefore(end, start)) {
        ranges = [end, start];
      }
      cell.pickStart = isSameDay(ranges[0], cell.date);
      cell.pickEnd = isSameDay(ranges[1], cell.date);
      cell.pickConnect = isBetween(cell.date, ranges[0], ranges[1]);
      return cell;
    })),
  })), [value, tmpEndDate, months]);

  return {
    months,
    onDateEnter: dateEnterHandle,
    onDateLeave: dateLeaveHandle,
    onDateClick: dateMouseDownHandle,
  };
};

usePickerAction.propTypes = {
  onDateEnter: PropTypes.func,
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType),
  ]).isRequired,
};

usePickerAction.defaultProps = {
  onDateEnter: null,
  onDateLeave: null,
};

export default usePickerAction;
