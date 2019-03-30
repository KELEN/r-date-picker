import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.scss'
import moment from 'moment'
import { getLastWeekDays } from '../src/utils/timer'

/**
 * single calendar select range
 */
export default class SingleDateRange extends React.Component {

  constructor() {
    super()
    this.state = {
      selectRange: [ moment('2019-03-27'), moment('2019-04-26') ],
      defaultDate: [ moment('2019-03-27'), moment('2019-04-26') ]
    }

    this.rangeChange = this.rangeChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.setRange = this.setRange.bind(this)
  }

  rangeChange(range) {
    this.setState({
      selectRange: range,
      // 必须设置为空,后续才能继续设置
      defaultDate: null
    })
  }

  handleLanguageChange(e) {
    this.setState({
      lang: e.target.value
    })
  }

  setRange(type) {
    if (type === 'lastWeek') {
      const lastWeeks = getLastWeekDays()
      this.setState({
        defaultDate: lastWeeks
      })
    }
  }

  render() {

    const formatArray = (arr) => {
      let str = ''
      if (arr[0]) str += arr[0].format('YYYY-MM-DD')
      else str += 'XXXX-XX-XX'
      str += ' to '
      if (arr[1]) str += arr[1].format('YYYY-MM-DD')
      else str += 'XXXX-XX-XX'
      return str
    }

    return (
      <div>
        <h3>{ formatArray(this.state.selectRange) }</h3>
        <div className="op-bar">
          <button onClick={ () => { this.setRange('lastWeek') } }>设置上一周</button>
        </div>
        <DatePicker
          onDateRangeChange={ this.rangeChange }
          range={ true }
          defaultDate={ this.state.defaultDate }
        />
      </div>
    )
  }
}
