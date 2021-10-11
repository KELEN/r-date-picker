import React, {
  useState,
} from 'react';
import dayjs from 'dayjs';
import {
  DatePicker,
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/Date Picker',
  component: DatePicker,
  argTypes: {
    className: {
      type: 'input',
      defaultValue: 'container',
    },
    value: {
      type: 'array',
    },
    calendarNumber: {
      type: 'number',
      control: {
        readonly: true,
      },
    },
    min: { control: 'date' },
    max: { control: 'date' },
  },
};

export const SingleDatePicker = (args) => {
  const [value, setValue] = useState(dayjs());
  return (
    <div>
      <h1>
        选中的日期:
        { value.format('YYYY-MM-DD') }
      </h1>
      <DatePicker
        className="container"
        range={false}
        min={dayjs().subtract(1, 'day')}
        max={dayjs().add(6, 'day')}
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
    </div>
  );
};

SingleDatePicker.bind({});

SingleDatePicker.args = {
  range: false,
  min: dayjs().subtract(1, 'day'),
  max: dayjs().add(6, 'day'),
};

export const DateRangePicker = (args) => {
  const [value, setValue] = useState([dayjs(), dayjs().add(3, 'day')]);

  return (
    <div>
      { value[0] ? value[0].format('YYYY-MM-DD') : '' }
      ~
      { value[1] ? value[1].format('YYYY-MM-DD') : '' }
      <DatePicker
        className="container"
        {...args}
        value={value}
        range
        onChange={(val) => {
          setValue(val);
        }}
        prevButton={(
          <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" /></svg>
        )}
        nextButton={(
          <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" /></svg>
        )}
      />
    </div>
  );
};

DateRangePicker.bind({});

DateRangePicker.args = {
  showOutside: false,
};

export const MultipleCalendarPicker = (args) => {
  const [value, setValue] = useState([dayjs(), dayjs().add(3, 'day')]);

  return (
    <div>
      { value[0] ? value[0].format('YYYY-MM-DD') : '' }
      ~
      { value[1] ? value[1].format('YYYY-MM-DD') : '' }
      <DatePicker
        {...args}
        className="multiple-calendar-container"
        value={value}
        range
        showOutside={false}
        onChange={(val) => {
          setValue(val);
        }}
        prevButton={(
          <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" /></svg>
        )}
        nextButton={(
          <svg style={{ width: 20 }} fill="rgb(130, 136, 138)" viewBox="0 0 1000 1000"><path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" /></svg>
        )}
      />
    </div>
  );
};

MultipleCalendarPicker.bind({});

MultipleCalendarPicker.args = {
  range: true,
  calendarNumber: 3,
};
