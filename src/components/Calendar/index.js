import React from 'react'
import { WEEK_DAYS } from '../../languages/en'
import moment from 'moment'
import CalendarHeader from './CalendarHeader'
import CalendarLabel from './CalendarLabel'
import CalendarBody from './CalendarBody'

class Calendar extends React.Component {

  constructor() {
    super()
    this.state = {
      currDate: moment()
    }
    this.onDayClick = this.onDayClick.bind(this)
    this.onPrevClick = this.onPrevClick.bind(this)
  }

  onDayClick(e) {
    console.log(e)
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    this.setState({
      currDate: moment(this.state.currDate).subtract(1, 'month')
    })
  } 

  /**
   * next btn click
   */
  onNextClick() {

  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)
    const { currDate } = this.state
    return (
      <div className="r-date-picker__container">
        <CalendarHeader title={ currDate.format('YYYY-MM-DD') } onPrevClick={ this.onPrevClick } onNextClick={ this.onNextClick } />
        <CalendarLabel labels={ labelKeys }></CalendarLabel>
        <CalendarBody currDate={ currDate } onDayClick={ this.onDayClick } />
      </div>
    )
  }
}

export default Calendar