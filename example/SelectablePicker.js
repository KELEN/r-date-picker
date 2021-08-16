import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.less'

/**
 * selectable calendar
 */
export default class SelectablePicker extends React.Component {

  constructor() {
    super()
    this.onDateClick = this.onDateClick.bind(this)
  }

  onDateClick(e, date) {
    console.log(date);
  }

  render() {
    return (
      <div>
        <h3>纯展示日历</h3>
        <DatePicker selectable={false} onDateClick={ this.onDateClick }/>
      </div>
    )
  }
}