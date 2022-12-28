import React, {
  useState,
} from 'react';
import dayjs from 'dayjs';
import {
  Calendar,
  DatePicker,
} from '../../lib/component';
import './airbnb.less';

import './index.less';
import { number } from 'prop-types';

export default {
  title: 'Calendar/Custom Style',
  component: DatePicker,
  argTypes: {
    className: {
      type: 'input',
      defaultValue: 'container',
    },
    value: {
      type: 'array',
    },
    min: { control: 'date' },
    max: { control: 'date' },
  },
};

export const AirbnbStyle = (args) => {
  const [customRangeValue, setCustomRangeValue] = useState([dayjs().subtract(4, 'day'), dayjs().add(2, 'day')]);

  return (
    <div className="flex">
      <div>
        <DatePicker
          range
          prevButton={(
            <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" /></svg>
          )}
          nextButton={(
            <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" /></svg>
          )}
          itemRender={(cell) => <div className="airbnb-date-cell">{cell.date.format('DD')}</div>}
          {...args}
          calendarNumber={2}
          className="airbnb-calendar"
          onChange={(v) => {
            setCustomRangeValue(v);
          }}
          value={customRangeValue}
        />
      </div>
    </div>
  );
};

AirbnbStyle.args = {
  defaultDate: dayjs(),
  range: true,
  value: [dayjs().subtract(4, 'day'), dayjs().add(2, 'day')],
  isoWeek: false,
};
