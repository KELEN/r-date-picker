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
import { isFunction } from '@/utils';

const PickerBody = React.memo((props) => {
  const {
    calendarData,
    itemRender,
    className,
    onChange,
    range,
    showOutside,
    style,
    value,
    onDateClick,
    onDateEnter,
    onDateLeave,
  } = props;

  const cellCls = (cell) => {
    if (!showOutside && !cell.inMonth) {
      return prefixClassObject({
        'calendar-cell': true,
        'calendar-cell-outside': true,
      });
    }

    return prefixClassObject({
      'calendar-cell': true,
      'calendar-cell-selected': !range && dayjs(value).isSame(dayjs(cell.date), 'day'),
      'calendar-cell-start': cell.pickStart,
      'calendar-cell-end': cell.pickEnd,
      'calendar-cell-connect': cell.pickConnect,
      'calendar-cell-disabled': !cell.inMonth || cell.disabled,
    });
  };

  const renderCell = (cell) => {
    if (!cell.inMonth && !showOutside) {
      return '';
    }
    return itemRender ? itemRender(cell) : cell.date.format('DD');
  };

  return (
    <div
      className={
        classNames(prefixClassObject({
          'calendar-body': true,
        }), className)
      }
      style={style}
    >
      {
        calendarData.map((rows, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={prefixClass('calendar-body-row')}>
            {
              rows.map((cell) => (
                <div
                  key={cell.date.format('YYYY-MM-DD')}
                  className={cellCls(cell)}
                  aria-hidden="true"
                  onMouseDown={(ev) => {
                    if (range && isFunction(onDateClick)) {
                      onDateClick(cell, ev);
                    }
                    if (!range && !cell.disabled && isFunction(onChange)) {
                      // 单选的情况
                      onChange(cell.date, ev);
                    }
                  }}
                  onMouseEnter={range ? (ev) => {
                    if (isFunction(onDateEnter)) {
                      onDateEnter(cell, ev);
                    }
                  } : null}
                  onMouseLeave={range ? (ev) => {
                    if (isFunction(onDateLeave)) {
                      onDateLeave(cell, ev);
                    }
                  } : null}
                >
                  { renderCell(cell) }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
});

PickerBody.propTypes = {
  // 自定义样式
  className: PropTypes.string,
  // 日期数据
  calendarData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape()),
  ).isRequired,
  // 自定义渲染
  itemRender: PropTypes.func,
  // 设置的值
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType),
  ]),
  // 选择日期
  onChange: PropTypes.func,
  // 是否选择范围
  range: PropTypes.bool,
  // 是否显示上下月的日期
  showOutside: PropTypes.bool,
  // 样式
  style: PropTypes.shape(),
  onDateClick: PropTypes.func,
  onDateEnter: PropTypes.func,
  onDateLeave: PropTypes.func,
};

PickerBody.defaultProps = {
  className: '',
  itemRender: null,
  onChange: null,
  value: undefined,
  min: null,
  max: null,
  range: false,
  showOutside: true,
  style: {},
  onDateClick: null,
  onDateEnter: null,
  onDateLeave: null,
};

export default PickerBody;
