import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import '../src/styles/index.less'
import moment from 'moment'
import DateRangePicker from '../src/components/DateRangePicker'
import SimpleDatePicker from '../example/SingleDatePicker'
import ShowDateRange from '../example/ShowDateRanges'
import CustomDatePicker from '../example/CustomDatePicker'
import IntlDatePicker from '../example/IntlDatePicker'
import SelectablePicker from '../example/SelectablePicker'
import Airbnb from '../example/Airbnb'
import MonthPicker from '../src/components/MonthPicker'

storiesOf('Date Picker', module)
  .add('Base', () => <SimpleDatePicker />)
  .add('Show Date Ranges', () => <ShowDateRange />)
  .add('Custom Render', () => <CustomDatePicker showApp={linkTo('Button')} />)
  .add('International ', () => <IntlDatePicker />)
  .add('SelectablePicker', () => <SelectablePicker />)

storiesOf('Multilple Date Picker', module)
  .add('One Calendar', () => {
    return <DateRangePicker single />
  })
  .add('Two Calendar', () => {
    return (
      <DateRangePicker
        minDate={moment()}
        onDateRangeChange={(val) => {
          console.log(val)
        }}
      />
    )
  })

storiesOf('Custom style', module).add('Airbnb style', () => <Airbnb />)

storiesOf('Month Picker', module).add('Month Picker', () => (
  <MonthPicker
    style={{ width: 300, height: 320 }}
    onMonthChange={(val) => console.log(val.format('YYYY-MM-DD'))}
  />
))
