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

const CalendarBody = (props) => {
  const {
    calendarData,
    itemRender,
    className,
    value,
    onDateSelect,
  } = props;

  return (
    <div
      className={
        classNames(prefixClassObject({
          'calendar-body': true,
        }), className)
      }
    >
      {
        calendarData.map((rows, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={prefixClass('calendar-body-row')}>
            {
              rows.map((cell) => (
                <div
                  key={cell.date.format('YYYY-MM-DD')}
                  className={prefixClassObject({
                    'calendar-cell': true,
                    'calendar-cell-disabled': !cell.inMonth,
                    'calendar-cell-selected': dayjs(value).isSame(dayjs(cell.date), 'day'),
                  })}
                  aria-hidden="true"
                  onClick={() => {
                    if (typeof onDateSelect === 'function') {
                      onDateSelect(cell);
                    }
                  }}
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
  value: dateType,
  // 选择日期
  onDateSelect: PropTypes.func,
};

CalendarBody.defaultProps = {
  className: '',
  itemRender: null,
  onDateSelect: null,
  value: null,
};

export default CalendarBody;
