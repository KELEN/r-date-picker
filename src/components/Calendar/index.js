import React from 'react'
import PropTypes from 'prop-types'
import moment, { max } from 'moment'
import { WEEK_DAYS } from '../../languages/en'
import CalendarHeader from './CalendarHeader'
import CalendarLabel from './CalendarLabel'
import CalendarBody from './CalendarBody'
import { isMonthAfter, isMonthBefore, getFirstDayOfMonth, getLastDayOfMonth, isSameDay } from '../../utils/timer'

class Calendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      animating: false,
      currentMonth: props.currentMonth    // default is today
    }

    this.onPrevClick = this.onPrevClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.checkIfHideNextBtn = this.checkIfHideNextBtn.bind(this)
  }

  /**
   * check hide next btn
   * @param {*} currentMonth
   * @param {*} maxDate
   */
  checkIfHideNextBtn(currentMonth, maxDate) {
    if (!maxDate) return false
    const nextMonth = currentMonth.clone().add(1, 'month')
    return !!(isMonthAfter(nextMonth, maxDate) || isSameDay(currentMonth, maxDate));
  }

  /**
   * check hide prev btn
   * @param {*} currentMonth
   * @param {*} minDate
   */
  checkIfHidePrevBtn(currentMonth, minDate) {
    if (!minDate) return false
    const prevMonth = currentMonth.clone().subtract(1, 'month')
    return !!(isMonthBefore(prevMonth, minDate) || isSameDay(currentMonth, minDate));
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    const { minDate, onMonthChange } = this.props
    const { currentMonth, animating } = this.state
    if (!animating) {
      const prevMonth = moment(currentMonth).subtract(1, 'month')
      if (!isMonthAfter(getFirstDayOfMonth(minDate), getFirstDayOfMonth(prevMonth))) {
        onMonthChange && onMonthChange(prevMonth.clone())
        this.setState({
          animating: true,
          currentMonth: prevMonth
        })
      }
    }
  }

  /**
   * next btn click
   */
  onNextClick() {
    const { maxDate, onMonthChange } = this.props
    const { currentMonth, animating } = this.state
    if (!animating) {
      const nextMonth = moment(currentMonth).add(1, 'month')
      if (!isMonthBefore(getLastDayOfMonth(maxDate), getLastDayOfMonth(nextMonth))) {
        onMonthChange && onMonthChange(nextMonth.clone())
        this.setState({
          animating: true,
          currentMonth: nextMonth
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { minDate: nextMinDate, maxDate: nextMaxDate, currentMonth: nextCurrentMonth } = nextProps
    const { currentMonth } = this.state

    if (nextMinDate && isMonthBefore(currentMonth, nextMinDate)) {
      this.setState({
        currentMonth: nextMinDate
      })
    }

    if (nextMaxDate && isMonthAfter(currentMonth, nextMaxDate)) {
      this.setState({
        currentMonth: nextMaxDate
      })
    }

    if (nextMaxDate && nextMinDate && isSameDay(nextMaxDate, nextMinDate)) {
      this.setState({
        currentMonth: nextMaxDate
      })
    }
  }

  render() {

    const labelKeys = Object.keys(WEEK_DAYS)

    const {
      currentMonth,
      animating
    } = this.state

    const {
      minDate,
      maxDate,
      renderPrevBtn,
      renderNextBtn
    } = this.props

    const hidePrevBtn = this.checkIfHidePrevBtn(currentMonth, minDate)
    const hideNextBtn = this.checkIfHideNextBtn(currentMonth, maxDate)

    return (
      <div className="rdp__container">
        <CalendarHeader
          renderNextBtn={ renderNextBtn }
          renderPrevBtn={ renderPrevBtn }
          currentMonth={ currentMonth }
          hidePrevBtn={ hidePrevBtn }
          hideNextBtn={ hideNextBtn }
          onPrevClick={ this.onPrevClick }
          onNextClick={ this.onNextClick }
        />
        <CalendarLabel labels={labelKeys} />
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

Calendar.propType = {
  // visible view month
  currentMonth: PropTypes.object,
  // start of range date or single date
  startDate: PropTypes.object,
  // end of range date
  endDate: PropTypes.object,
  // min month limit
  minDate: PropTypes.object,
  // min month limit
  maxDate: PropTypes.object,
  // month change event
  onMonthChange: PropTypes.func
}

Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  currentMonth: moment()
}


export default Calendar
