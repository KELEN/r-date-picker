import React from 'react';
import dayjs from 'dayjs';
import {
  Calendar,
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/calendar',
  component: Calendar,
  argTypes: {
    defaultDate: { control: 'date' },
  },
};

const Template = (args) => <Calendar {...args} />;

export const PureRender = Template.bind({});
PureRender.args = {
  className: 'container',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
};

export const CustomRender = Template.bind({});

CustomRender.args = {
  className: 'custom-style',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
  isoWeek: false,
  itemRender(cell) {
    return (
      <div className="custom-item-render">{ cell.date.format('DD') }</div>
    );
  },
};
