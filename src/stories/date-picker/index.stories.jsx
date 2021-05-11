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
        onDateSelect={({
          date,
        }) => {
          setValue(date);
        }}
      />
    </div>
  );
};

SingleDatePicker.bind({});

SingleDatePicker.args = {
  range: false,
};
