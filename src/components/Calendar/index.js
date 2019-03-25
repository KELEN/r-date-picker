import React from 'react'
import PropTypes from 'prop-types'
import { WEEK_DAYS } from '../../languages/en'
import moment from 'moment'
import CalendarHeader from './CalendarHeader'
import CalendarLabel from './CalendarLabel'
import CalendarBody from './CalendarBody'

class Calendar extends React.Component {

  static propType = {
    selectedDate: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      animating: false,
      currDate: moment()
    }
    this.onPrevClick = this.onPrevClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    if (!this.state.animating) {
      this.setState({
        animating: true,
        currDate: moment(this.state.currDate).subtract(1, 'month')
      })
    }
  }


  /**
   * next btn click
   */
  onNextClick() {
    if (!this.state.animating) {
      this.setState({
        animating: true,
        currDate: moment(this.state.currDate).add(1, 'month')
      })
    }
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)
    const { currDate, animating } = this.state
    const { onDayClick, selectedDate } = this.props

    return (
      <div className="r-date-picker__container">
        <CalendarHeader title={ currDate.format('YYYY-MM-DD') } onPrevClick={ this.onPrevClick } onNextClick={ this.onNextClick } />
        <CalendarLabel labels={ labelKeys } ></CalendarLabel>
        <CalendarBody isAnimating={ animating } animateEnd={ () => this.setState({ animating: false }) } currDate={ currDate } onDayClick={ onDayClick } selectedDate={ selectedDate }/>
      </div>
    )
  }
}

export default Calendar