import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  isSameDay,
  isBetween,
} from '@/utils/dayjs';

const useMouseAction = ({
  calendarData = [],
  value = [],
  onChange,
}) => {

  const dateEnterHandle = (cell, ev) => {
  };

  const dateLeaveHandle = (cell, ev) => {

  };

  const dateMouseDownHandle = (cell, ev) => {
    if (value[0] === undefined || value[0] && value[1]) {
      value[0] = cell.date;
      value[1] = undefined;
      onChange(value.slice());
    } else if (value[0] && value[1] === undefined) {
      value[1] = cell.date;
      onChange(value.slice());
    }
  };

  calendarData = React.useMemo(() => {
    return calendarData.map((row) => {
      return row.map(cell => {
        cell.pickStart = isSameDay(value[0], cell.date);
        cell.pickEnd = isSameDay(value[1], cell.date);
        cell.pickConnect = isBetween(cell.date, value[0], value[1])
        return cell;
      })
    })
  }, [value]);

  return {
    calendarData,
    onDateEnter: dateEnterHandle,
    onDateLeave: dateLeaveHandle,
    onMouseDown: dateMouseDownHandle,
  };
};

useMouseAction.propTypes = {
  onDateEnter: PropTypes.func,
};

useMouseAction.defaultProps = {
  onDateEnter: null,
  onDateLeave: null,
};

export default useMouseAction;
