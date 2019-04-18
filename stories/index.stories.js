import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import '../src/styles/index.scss'

import moment from 'moment'


import DateRangePicker from '../src/components/DateRangePicker'
import SimpleDatePicker from '../example/SingleDatePicker'
import ShowDateRange from '../example/ShowDateRanges'
import CustomDatePicker from '../example/CustomDatePicker'
import IntlDatePicker from '../example/IntlDatePicker'
import SelectablePicker from '../example/SelectablePicker'
import Airbnb from '../example/Airbnb'

storiesOf('Date Picker', module)
  .add('Base', () =>  <SimpleDatePicker /> )
  .add('Show Date Ranges', () =>  <ShowDateRange /> )
  .add('Custom Render', () => <CustomDatePicker showApp={linkTo('Button')} />)
  .add('International ', () => <IntlDatePicker /> )
  .add('SelectablePicker', () => <SelectablePicker />)

storiesOf('Multilple Date Picker', module)
  .add('One Calendar', () => {
    return (
      <DateRangePicker single={true} />
    )
  })
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
