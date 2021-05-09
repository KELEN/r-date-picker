import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  prefixClass,
} from '../utils/style';
import {
  getDateArray,
} from '../utils/dayjs';

const CalendarBody = (props) => {
  const {
    defaultDate,
    itemRender,
  } = props;

  const calendarData = getDateArray(defaultDate);

  return (
    <div className={prefixClass('calendar-body')}>
      {
        calendarData.map((rows, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={prefixClass('calendar-body-row')}>
            {
              rows.map((cell) => (
                <div key={cell.date.format('YYYY-MM-DD')} className={prefixClass('calendar-body-row-cell')}>
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
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(dayjs),
  ]),
  itemRender: PropTypes.func,
};

CalendarBody.defaultProps = {
  defaultDate: dayjs().format('YYYY-MM-01'),
  itemRender: null,
};

export default CalendarBody;
