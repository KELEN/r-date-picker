import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { WEEK_DAYS } from '../../languages/en'
import CalendarHeader from './CalendarHeader'
import CalendarLabel from './CalendarLabel'
import CalendarBody from './CalendarBody'
import { isMonthAfter, isMonthBefore   } from '../../utils/timer'

class Calendar extends React.Component {

  static propType = {
    // view month
    currentMonth: PropTypes.object,
    // start of range date or single date
    startDate: PropTypes.object,
    // end of range date
    endDate: PropTypes.object,
    // min month limit
    minMonth: PropTypes.object,        
    // min month limit
    maxMonth: PropTypes.object,
    // month change event
    onMonthChange: PropTypes.func
  }

  static defaultProps = {
    minMonth: null,
    maxMonth: null,
    startDate: null,
    endDate: null
  }

  constructor(props) {
    super(props)

    let currentMonth = props.currentMonth
    let { minMonth, maxMonth } = props
    
    if (minMonth) {
      if (minMonth.isAfter(currentMonth)) {
        currentMonth = minMonth
      }
    }

    if (maxMonth) {
      if (maxMonth.isBefore(currentMonth)) {
        currentMonth = maxMonth
      }
    }
    
    this.state = {
      animating: false,
      hidePrevBtn: false,
      hideNextBtn: false,
      currentMonth: currentMonth    // default is today
    }

    this.onPrevClick = this.onPrevClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    const { minMonth, maxMonth, onMonthChange } = this.props
    const { currentMonth, animating } = this.state
    if (!animating) {
      const prevMonth = moment(currentMonth).subtract(1, 'month')
      if (!isMonthAfter(minMonth, prevMonth)) {
        onMonthChange && onMonthChange(prevMonth.clone())
        this.setState({
          animating: true,  
          currentMonth: prevMonth,
          hidePrevBtn: isMonthAfter(minMonth, prevMonth.clone().subtract(1, 'month')),
          hideNextBtn: isMonthBefore(maxMonth, prevMonth)
        })
      }
    }
  }

  /**
   * next btn click
   */
  onNextClick() {
    const { minMonth, maxMonth, onMonthChange } = this.props
    const { currentMonth, animating } = this.state
    if (!animating) {
      const nextMonth = moment(currentMonth).add(1, 'month')
      if (!isMonthBefore(maxMonth, nextMonth)) {
        onMonthChange && onMonthChange(nextMonth.clone())
        this.setState({
          animating: true,
          currentMonth: nextMonth,
          hidePrevBtn: isMonthAfter(minMonth, nextMonth),
          hideNextBtn: isMonthBefore(maxMonth, nextMonth.clone().add(1, 'month'))
        })
      }
    }
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)

    const {
      currentMonth,
      animating,
      hidePrevBtn,
      hideNextBtn
    } = this.state

    return (
      <div className="rdp__container">
        <CalendarHeader 
          currentMonth={ currentMonth }
          hidePrevBtn={ hidePrevBtn }
          hideNextBtn={ hideNextBtn }
          onPrevClick={ this.onPrevClick }
          onNextClick={ this.onNextClick }
        />
        <CalendarLabel 
          labels={ labelKeys } 
        ></CalendarLabel>
        <CalendarBody
          { ...this.props }
          isAnimating={ animating }
          animateEnd={ () => this.setState({ animating: false }) } 
          currentMonth={ currentMonth }
        />
      </div>
    )
  }
}

export default Calendar