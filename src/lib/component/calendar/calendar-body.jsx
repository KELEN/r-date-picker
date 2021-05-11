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
  // 选择日期
  onDateSelect: PropTypes.func,
};

CalendarBody.defaultProps = {
  className: '',
  itemRender: null,
  onDateSelect: null,
};

export default CalendarBody;
