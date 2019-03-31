import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.scss'
import moment from 'moment'

/**
 * single calendar select range
 */
export default class extends React.Component {

  constructor() {
    super()
    this.state = {
    	defaultDate: moment(),
    	ranges: [[moment('2019-03-21'), moment('2019-03-25')], [moment('2019-03-10'), moment('2019-03-10')], [moment('2019-03-1'), moment('2019-03-4')]],
    }

    this.rangeChange = this.rangeChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
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

  render() {


    const { ranges } = this.state

    return (
      <div>
	      <h3>显示范围: </h3>
        <ul>
	        <li>2019-03-21~2019-03-25</li>
	        <li>2019-03-10~2019-03-10</li>
	        <li>2019-03-01~2019-03-04</li>
        </ul>
        <DatePicker
          onDateRangeChange={ this.rangeChange }
          ranges={ ranges }
          defaultDate={ this.state.defaultDate }
        />
      </div>
    )
  }
}
