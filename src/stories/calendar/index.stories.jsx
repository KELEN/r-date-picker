import React from 'react';
import dayjs from 'dayjs';
import {
  Calendar,
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/Calendar',
  component: Calendar,
  argTypes: {
    defaultDate: { control: 'date' },
    min: { control: 'date' },
    max: { control: 'date' },
    onChange: {
      control: {
        disable: true,
      },
    },
  },
};

const Template = (args) => <Calendar {...args} />;

export const PureRender = Template.bind({});
PureRender.args = {
  className: 'container',
  defaultDate: dayjs().format('YYYY-MM-DD'),
  showOutside: false,
  min: dayjs().subtract(1, 'days'),
};

export const PureRangeRender = Template.bind({});
PureRangeRender.args = {
  className: 'container',
  range: true,
  value: [dayjs(), dayjs().add(4, 'day')],
};
