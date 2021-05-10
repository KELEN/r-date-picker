import React from 'react';
import dayjs from 'dayjs';
import {
  Calendar,
} from '../../lib/component';
import './index.less';

export default {
  title: 'Calendar/normal-calendar',
  component: Calendar,
  argTypes: {
    defaultDate: { control: 'date' },
  },
};

const Template = (args) => <Calendar {...args} />;

export const OnlyShow = Template.bind({});
OnlyShow.args = {
  className: 'container',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
};

export const CustomShow = Template.bind({});

CustomShow.args = {
  className: 'custom-style',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
  itemRender(cell) {
    return (
      <div className="custom-item-render">{ cell.date.format('DD') }</div>
    );
  },
};

export const isoWeek = Template.bind({});

isoWeek.args = {
  className: 'custom-style',
  defaultDate: dayjs('2021-05').format('YYYY-MM'),
  isoWeek: true,
  itemRender(cell) {
    return (
      <div className="custom-item-render">{ cell.date.format('DD') }</div>
    );
  },
};