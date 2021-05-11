import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {
  prefixClass,
  prefixClassObject,
} from '@/utils/style';
import {
  dateType,
} from '@/utils/prop-types';
import useMouseAction from '../../hooks/useMouseAction';

const CalendarBody = (props) => {
  const {
    calendarData,
    itemRender,
    className,
    value,
    onChange,
    range,
  } = props;

  const {
    calendarData: newCalendarData,
    onDateEnter,
    onDateLeave,
    onMouseDown,
  } = useMouseAction({
    calendarData,
    onChange,
    value,
  });

  const cellCls = (cell) => prefixClassObject({
    'calendar-cell': true,
    'calendar-cell-disabled': !cell.inMonth,
    'calendar-cell-selected': !range && dayjs(value).isSame(dayjs(cell.date), 'day'),
    'calendar-cell-start': cell.pickStart,
    'calendar-cell-end': cell.pickEnd,
    'calendar-cell-connect': cell.pickConnect,
  });

  return (
    <div
      className={
        classNames(prefixClassObject({
          'calendar-body': true,
        }), className)
      }
    >
      {
        newCalendarData.map((rows, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={prefixClass('calendar-body-row')}>
            {
              rows.map((cell) => (
                <div
                  key={cell.date.format('YYYY-MM-DD')}
                  className={cellCls(cell)}
                  aria-hidden="true"
                  onClick={(ev) => {
                    if (typeof onChange === 'function' && !range) {
                      // 单选的情况
                      onChange(cell.date, ev);
                    }
                  }}
                  onMouseDown={range ? (ev) => {
                    if (typeof onMouseDown === 'function') {
                      onMouseDown(cell, ev);
                    }
                  } : null}
                  onMouseEnter={range ? (ev) => {
                    if (typeof onDateEnter === 'function') {
                      onDateEnter(cell, ev);
                    }
                  } : null}
                  onMouseLeave={range ? (ev) => {
                    if (typeof onDateLeave === 'function') {
                      onDateLeave(cell, ev);
                    }
                  } : null}
                >
                  {
                    itemRender ? itemRender(cell) : cell.date.format('DD')
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

CalendarBody.propTypes = {
  // 自定义样式
  className: PropTypes.string,
  // 日期数据
  calendarData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape()),
  ).isRequired,
  // 自定义渲染
  itemRender: PropTypes.func,
  // 值
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType)
  ]),
  // 选择日期
  onChange: PropTypes.func,
  // 是否选择范围
  range: PropTypes.bool,
};

CalendarBody.defaultProps = {
  className: '',
  itemRender: null,
  onChange: null,
  value: null,
  range: false,
};

export default CalendarBody;
