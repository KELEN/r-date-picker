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
  value: dayjs().format('YYYY-MM-DD'),
  showOutside: false,
  min: dayjs().subtract(1, 'days'),
};

const PureRangeRenderTemplate = (args) => {
  const { value } = args;
  return (
    <div className="container">
      { `${value[0].format('YYYY-MM-DD')} ~ ${value[1].format('YYYY-MM-DD')}` }
      <Calendar {...args} />
    </div>
  );
};

export const PureRangeRender = PureRangeRenderTemplate.bind({});
PureRangeRender.args = {
  className: 'container',
  range: true,
  value: [dayjs(), dayjs().add(4, 'day')],
};
