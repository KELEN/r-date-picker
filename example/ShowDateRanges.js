import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.less'
import moment from 'moment'

/**
 * single calendar select range
 */
export default class extends React.Component {

  constructor() {
    super()
    this.state = {
    	// defaultDate: moment(),
    	ranges: [[moment().subtract(4, 'days'), moment()], [moment().add(3, 'days'), moment().add(10, 'days')]],
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
	        <li>
            { ranges[0][0].format('YYYY-MM-DD') } ~ { ranges[0][1].format('YYYY-MM-DD') }
          </li>
          <li>
            { ranges[1][0].format('YYYY-MM-DD') } ~ { ranges[1][1].format('YYYY-MM-DD') }
          </li>
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
