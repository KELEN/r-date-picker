import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import moment from 'moment'
import DatePicker from '../src/components/DatePicker'
import DateRangePicker from '../src/components/DateRangePicker'

import SimpleDatePicker from '../example/SingleDatePicker'

storiesOf('Date Picker', module)
  .add('Base', () => 
    <SimpleDatePicker showApp={linkTo('Button')}  />
  )
  .add('Single Date Range', () => 
    <DatePicker 
      onDateRangeChange={ (range) => { console.log(range) } } 
      range={ true }
      defaultDate={[ moment('2019-03-27'), moment('2019-04-26') ]}
      showApp={linkTo('Button')} 
    />
  )
  .add('Custom Render', () => 
    <DatePicker
      itemRender={ 
        (item) => { 
          const markDays = {
            20190329: {
              avator: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4208386305,57701306&fm=27&gp=0.jpg'
            },
            20190327: {
              avator: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg'
            }
          }
          let mark, target
          if (item.date && (target = markDays[item.date.format('YYYYMMDD')])) {
            mark = (<div style={{ 
              backgroundImage: `url(${ target.avator })`, 
              borderRadius: '50%',
              backgroundSize: 'contain',
              width: 40,
              height: 40
            }}></div>)
          } else {
            mark = (<div data-label={ item.key }>{ item.num }</div>)
          }
          return mark
        } 
      } 
      howApp={linkTo('Button')} />)

storiesOf('Multilple Date Picker', module)
  .add('Two Calendar', () => {
    return (
      <DateRangePicker minMonth={ moment('2019-02-01') } maxMonth={ moment('2019-06-01') }/>
    )
  })
