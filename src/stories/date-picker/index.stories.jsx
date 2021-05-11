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
    defaultDate: { control: 'date' },
  },
};

export const SingleDatePicker = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <DatePicker
      className="container"
      value={value}
      onDateSelect={({
        date,
      }) => {
        setValue(date);
      }}
    />
  );
};
