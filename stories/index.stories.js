import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import DatePicker from '../src/index'
import DateRangePicker from '../src/components/DateRangePicker'

storiesOf('Date Picker', module)
  .add('Base', () => <DatePicker showApp={linkTo('Button')} />)
  .add('Single Date Range', () => <DatePicker onDateRangeChange={ (range) => { console.log(range) } } range={ true } showApp={linkTo('Button')} />)

storiesOf('Multilple Date Picker', module)
  .add('Two Calendar', () => <DateRangePicker />)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
