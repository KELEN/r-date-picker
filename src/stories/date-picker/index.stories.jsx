import React, {
  useState,
} from 'react';
import dayjs from 'dayjs';
import {
  DatePicker,
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/date-picker',
  component: DatePicker,
  argTypes: {
    className: {
      type: 'input',
      defaultValue: 'container',
    },
    value: {
      type: 'array',
    }
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
        {...args}
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
          console.log(val);
          setValue(val);
        }}
      />
    </div>
  );
};

DateRangePicker.bind({});

DateRangePicker.args = {
  range: true,
};
