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
    min: PropTypes.object,
    max: PropTypes.object,
    defaultDate: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  static defaultProps = {
    min: null,
    max: null,
    defaultDate: null
  }

  constructor(props) {
    super(props)

    let startDate = moment()
    let { min, max } = props
    if (min) {
      if (min.isAfter(startDate)) {
        startDate = min
      }
    }

    if (max) {
      if (max.isBefore(startDate)) {
        startDate = max
      }
    }
    
    this.state = {
      animating: false,
      startDate: startDate    // default is today
    }
    this.onPrevClick = this.onPrevClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    const { min } = this.props
    if (!this.state.animating) {
      const prevMonth = moment(this.state.startDate).subtract(1, 'month')
      if (min && min.isAfter(prevMonth)) {
        return
      }
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
    const { max } = this.props
    if (!this.state.animating) {
      const nextMonth = moment(this.state.startDate).add(1, 'month')
      if (max && max.isBefore(nextMonth)) {
        return
      }
      this.setState({
        animating: true,
        startDate: nextMonth
      })
    }
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)
    const { startDate, animating } = this.state
    const { 
      onDateChange, 
      defaultDate,
      onHoveringDateChange,
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
          onHoveringDateChange={ onHoveringDateChange }
          onDateRangeChange={ onDateRangeChange }
          onDateChange={ onDateChange } 
          defaultDate={ defaultDate }
        />
      </div>
    )
  }
}

export default Calendar