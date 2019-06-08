import React from 'react'
import DatePicker from '../src/components/DatePicker'
import moment from 'moment'
import './style.scss'

export default class SimpleDatePicker extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedDate: moment(),
      minDate: null,
      maxDate: null
    }
    this.setMinDate = this.setMinDate.bind(this)
    this.setMaxDate = this.setMaxDate.bind(this)
    this.setLimit = this.setLimit.bind(this)
    this.resetLimit = this.resetLimit.bind(this)
  }

  resetLimit() {
    this.setState({
      minDate: null,
      maxDate: null,
      disabledDates: []
    })
  }

  setMinDate() {
    this.setState({
      minDate: moment('2019-02-12')
    })
  }

  setMaxDate() {
    this.setState({
      maxDate: moment('2019-05-01')
    })
  }

  setLimit() {
    this.setState({
      disabledDates: [ '2019-03-15', '2019-03-21' ]
    })
  }

  render() {
    const {
      selectedDate,
      minDate,
      maxDate,
      disabledDates
    } = this.state
    return (
      <div>
        <h3>选中的日期: { selectedDate.format('YYYY-MM-DD') }</h3>
        <div className='op-bar'>
          <button onClick={ this.setMinDate }>设置最小日期为2019-02-12</button>
          <button onClick={ this.setMaxDate }>设置最大日期为2019-05-01</button>
          <button onClick={ this.setLimit }>禁止选择2019-03-15, 2019-03-21</button>
          <button onClick={ this.resetLimit }>取消限制</button>
        </div>
        <DatePicker
          minDate={ minDate && moment(minDate) }
          maxDate={ maxDate && moment(maxDate) }
          disabledDates={ disabledDates }
          defaultDate={ selectedDate }
          onDateChange={ (event, date) => this.setState({ selectedDate: date }) }
        />
      </div>
    )
  }
}
