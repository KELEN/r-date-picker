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
      unPassRange: [moment().subtract(10, 'day'), moment().subtract(5, 'day')],
    	ranges: [[moment().add(8, 'day'), moment().add(12, 'day')], [moment(), moment().add(8, 'day')]],
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
    const rangeStart = ranges.map(item => item[0]);
    return (
      <div>
	      <h3>显示范围: </h3>
        <ul>
	        
        </ul>
        <DatePicker
          className="show-date-range"
          selectable={false}
s         onDateRangeChange={ this.rangeChange }
          ranges={ ranges }
          itemClass={(item) => {
            if (unPassRange[0].isSame(item.date, 'day')) {
              return 'unpass-range-start';
            }
            if (moment(unPassRange[0]).isBefore(item.date, 'day') && moment(unPassRange[1]).isAfter(item.date, 'day')) {
              return 'unpass-range-connect';
            }
            if (unPassRange[1].isSame(item.date, 'day')) {
              return 'unpass-range-end';
            }
          }}
          itemRender={(item => {
            if (rangeStart.findIndex(r => (r.isSame(item.date, 'day'))) > -1 || unPassRange[0].isSame(item.date, 'day')) {
              return (
                <div className="calendar-avatar-wrap">
                  <div className="calendar-avatar" style={{ backgroundImage: `url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3912782603,1429276006&fm=26&gp=0.jpg)` }}></div>
                </div>
              )
            } else {
              return (
                <div className="calendar-item-wrap">
                  { item.num }
                </div>
              );
            }
          })}
          defaultDate={ this.state.defaultDate }
        />
      </div>
    )
  }
}
