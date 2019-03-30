import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import moment from 'moment'


import DateRangePicker from '../src/components/DateRangePicker'
import SimpleDatePicker from '../example/SingleDatePicker'
import SingleDateRange from '../example/SingleDateRange'
import CustomDatePicker from '../example/CustomDatePicker'
import IntlDatePicker from '../example/IntlDatePicker'
import Airbnb from '../example/Airbnb'

storiesOf('Date Picker', module)
  .add('Base', () =>  <SimpleDatePicker /> )
  .add('Single Date Range', () =>  <SingleDateRange /> )
  .add('Custom Render', () => <CustomDatePicker showApp={linkTo('Button')} />)
  .add('International ', () => <IntlDatePicker /> )

storiesOf('Multilple Date Picker', module)
  .add('Two Calendar', () => {
    return (
      <DateRangePicker minDate={ moment('2019-02-01') } maxDate={ moment('2019-06-01') }/>
    )
  })

storiesOf('Custom style', module)
  .add('Airbnb style', () => {
    return (
      <Airbnb />
    )
  })
