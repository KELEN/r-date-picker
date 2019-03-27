import React from 'react'
import PropTypes from 'prop-types'
import { WEEK_DAYS } from '../../languages/en'
import moment from 'moment'
import CalendarHeader from './CalendarHeader'
import CalendarLabel from './CalendarLabel'
import CalendarBody from './CalendarBody'

class Calendar extends React.Component {

  static propType = {
    // if array, range default 
    // if object single defautl
    defaultDate: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  static defaultProps = {
    defaultDate: null
  }

  constructor() {
    super()
    this.state = {
      animating: false,
      startDate: moment()
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
        startDate: moment(this.state.startDate).subtract(1, 'month')
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
        startDate: moment(this.state.startDate).add(1, 'month')
      })
    }
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)
    const { startDate, animating } = this.state
    const { 
      onDateChange, 
      defaultDate,
      onDateRangeChange,
      range,
      itemRender
    } = this.props

    return (
      <div className="rdp__container">
        <CalendarHeader title={ startDate.format('YYYY-MM') } onPrevClick={ this.onPrevClick } onNextClick={ this.onNextClick } />
        <CalendarLabel labels={ labelKeys } ></CalendarLabel>
        <CalendarBody 
          range={ range }
          isAnimating={ animating } 
          animateEnd={ () => this.setState({ animating: false }) } 
          startDate={ startDate }
          itemRender={ itemRender }
          onDateRangeChange={ onDateRangeChange }
          onDateChange={ onDateChange } 
          defaultDate={ defaultDate }
        />
      </div>
    )
  }
}

export default Calendar