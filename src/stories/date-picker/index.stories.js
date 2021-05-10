import React from 'react';
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

const Template = (args) => <DatePicker {...args} />;

export const SingleDatePicker = Template.bind({});
SingleDatePicker.args = {
  className: 'container',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
};
