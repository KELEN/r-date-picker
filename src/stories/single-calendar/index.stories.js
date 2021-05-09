import React from 'react';
import dayjs from 'dayjs';
import {
  Calendar
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/normal-calendar',
  component: Calendar,
  argTypes: {
    initialDate: { control: 'date' },
  },
};

const Template = (args) => <Calendar {...args} />;


export const OnlyShow = Template.bind({});
OnlyShow.args = {
  className: 'container',
  initialDate: dayjs('2021-05-01').format('YYYY-MM-DD'),
};
