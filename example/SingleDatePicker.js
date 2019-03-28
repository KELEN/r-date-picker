import React from 'react'
import DatePicker from '../src/components/DatePicker'
import moment from 'moment'

export default class SimpleDatePicker extends React.Component {

  state = {
    selectedDate: moment()
  }

  render() {
    const { selectedDate } = this.state
    return (
      <div>
        <div>选中的日期: { selectedDate.format('YYYY-MM-DD') }</div>
        <DatePicker
          minMonth={ moment('2019-01-01') }
          maxMonth={ moment('2019-04-01') }
          defaultDate={ selectedDate }
          onDateChange={ (event, date) => this.setState({ selectedDate: date }) }
        />
      </div>
    )
  }
}