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
      unPassRange: [[moment().subtract(10, 'day'), moment().subtract(5, 'day')]],
    	ranges: [[moment(), moment().add(3, 'day')]],
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


    const { ranges, unPassRange } = this.state

    const unPassStart = unPassRange.map(item => item[0]);
    const unPassEnd = unPassRange.map(item => item[1]);
    return (
      <div>
	      <h3>显示范围: </h3>
        <ul>
	        
        </ul>
        <DatePicker
          selectable={false}
s         onDateRangeChange={ this.rangeChange }
          ranges={ ranges }
          itemClass={(item) => {
            for (let i = 0; i < unPassStart.length; i++) {
              if (unPassStart[i].isSame(item.date)) {
                return 'unpass-range-start';
              }
              if (unPassEnd[i].isSame(item.data)) {
                return 'unpass-range-end';
              }
            }
          }}
          defaultDate={ this.state.defaultDate }
        />
      </div>
    )
  }
}
