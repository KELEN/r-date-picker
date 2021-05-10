import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames'
import {
  prefixClass,
  prefixClassObject,
} from '@/utils/style';
import {
  dateType
} from '@/utils/prop-types'

const CalendarBody = (props) => {
  const {
    calendarData,
    itemRender,
    className,
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
                    'calendar-body-cell': true,
                    'calendar-body-cell-disabled': !cell.inMonth,
                  })}
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
  calendarData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape())
  ),
  itemRender: PropTypes.func,
};

CalendarBody.defaultProps = {
  itemRender: null,
};

export default CalendarBody;
