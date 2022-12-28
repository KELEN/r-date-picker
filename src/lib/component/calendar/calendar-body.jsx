import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  prefixClass,
  prefixClassObject,
} from '@/utils/style';

const CalendarBody = (props) => {
  const {
    calendarData,
    itemRender,
    className,
    showOutside,
    style,
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
      'calendar-cell-selected': cell.selected,
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
};

CalendarBody.propTypes = {
  /**
   * 外部的className
   */
  className: PropTypes.string,
  /**
   * 日历数据
   */
  calendarData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape()),
  ).isRequired,
  /**
   * 自定义单元格渲染
   */
  itemRender: PropTypes.func,
  /**
   * 当前日历是否显示上下月的日期，自动填充单元格内容
   */
  showOutside: PropTypes.bool,
  /**
   * 内联样式
   */
  style: PropTypes.shape(),
};

CalendarBody.defaultProps = {
  className: '',
  itemRender: null,
  showOutside: true,
  style: {},
};

export default CalendarBody;
