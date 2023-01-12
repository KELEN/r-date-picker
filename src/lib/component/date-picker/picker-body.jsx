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
import { isBefore } from '@/utils/dayjs';

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
    onHoverChange,
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
                    if (
                      (!showOutside && !cell.inMonth)
                      || !isFunction(onChange) || cell.disabled || !cell.inMonth
                    ) {
                      return;
                    }
                    if (range) {
                      const [start, end] = value;
                      if (start) {
                        if (end) {
                          onChange([cell.date, null]);
                        } else {
                          let newVal = [start, cell.date];
                          if (isBefore(cell.date, start)) {
                            newVal = [cell.date, start];
                          }
                          onHoverChange(null);
                          onChange(newVal);
                        }
                      } else {
                        // 重新选择开始日期
                        onChange([cell.date, null]);
                      }
                    } else {
                      // 单选的情况
                      onChange(cell.date, ev);
                    }
                  }}
                  onMouseEnter={() => {
                    if (value[0] && !value[1]) {
                      onHoverChange(cell.date);
                    }
                  }}
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

PickerBody.displayName = "PickerBody";

PickerBody.propTypes = {
  /**
   * 自定义className
   */
  className: PropTypes.string,
  /**
   * 需要渲染的日期数据
   */
  calendarData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape()),
  ).isRequired,
  /**
   * 自定义渲染项
   */
  itemRender: PropTypes.func,
  /**
   * 日期值
   */
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType),
  ]),
  /**
   * 选中日期回调
   */
  onChange: PropTypes.func,
  /**
   * 是否显示范围
   */
  range: PropTypes.bool,
  /**
   * 显示当前月份的其他日期
   */
  showOutside: PropTypes.bool,
  /**
   * 内联样式
   */
  style: PropTypes.shape(),
  /**
   * 鼠标移动回调事件
   */
  onHoverChange: PropTypes.func.isRequired,
};

PickerBody.defaultProps = {
  className: '',
  itemRender: null,
  onChange: null,
  value: undefined,
  range: false,
  showOutside: true,
  style: {},
};

export default PickerBody;
