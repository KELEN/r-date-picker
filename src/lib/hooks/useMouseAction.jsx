/* eslint-disable no-param-reassign */
import React, {
  useState,
  useEffect,
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
    if (value[0] === undefined || (value[0] && value[1])) {
      value[0] = cell.date;
      value[1] = undefined;
      onChange(value.slice());
    } else if (value[0] && value[1] === undefined) {
      value[1] = cell.date;
      if (isBefore(value[1], value[0])) {
        value = [value[1], value[0]];
      }
      onChange(value.slice());
    }
  };

  calendarData = React.useMemo(() => calendarData.map((row) => row.map((cell) => {
    cell.pickStart = isSameDay(value[0], cell.date);
    cell.pickEnd = isSameDay(value[1], cell.date);
    cell.pickConnect = isBetween(cell.date, value[0], value[1]);
    return cell;
  })), [value]);

  return {
    calendarData,
    onDateEnter: dateEnterHandle,
    onDateLeave: dateLeaveHandle,
    onMouseDown: dateMouseDownHandle,
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
