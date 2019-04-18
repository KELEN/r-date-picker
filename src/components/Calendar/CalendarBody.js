import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classname'
import { isSameDay, isMonthBefore, isMonthAfter, isDayBefore, isDayAfter, dateDisabled } from '../../utils/timer'
import { checkInRange } from '../../utils/timer'

class CalendarBody extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      allDays: this.getAllDays(props.currentMonth),
      moveNext: false,
      movePrev: false
    }

    if (props.ranges) {
	    this.checkInRange = checkInRange(props.ranges)
    }

    this.renderCurrentMonthDays = this.renderCurrentMonthDays.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)

    this.transitionEndHandle = this.transitionEndHandle.bind(this)
  }

  getMonthDays(startOfMonth) {
    const daysInMonth = startOfMonth.daysInMonth()   // total num in month
    const startNum = startOfMonth.weekday()          // the first weekday
    const nextMonth = startOfMonth.clone().add(1, 'month')
    const endNum = 7 - nextMonth.weekday()
    return {
      [startOfMonth.format('YYYYMMDD')]: [
        ...this.renderPrevMonthDays(startOfMonth, startNum),
        ...this.renderCurrentMonthDays(startOfMonth, daysInMonth),
        ...this.renderNextMonthDays(nextMonth.startOf('month'), endNum)
      ]
    }
  }

  /**
   * render last month
   */
  renderPrevMonthDays(firstDay, count) {
    const emptyDays = []
    let start = moment(firstDay).subtract(count, 'days')
    let i = -1
    while (count--) {
      emptyDays.push(
        {
          num: '',
          date: null,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true,
        }
      )
      start = moment(firstDay).subtract(count, 'days')
    }
    return emptyDays
  }

  /**
   * render current month
   */
  renderCurrentMonthDays(firstDay, count) {
    const realDays = []
    let i = 1
    while (count--) {
      const date = moment(firstDay).add(i - 1, 'days')
      realDays.push(
        {
          num: i,
          active: false,
          date: date,
          connect: false,
          isStart: false,
          isEnd: false,
          isDisable: false,
          key: date.format('YYYYMMDD'),
          inMonth: true
        }
      )
      i++
    }
    return realDays
  }

  /**
   * render next month days
   * @param {*} start
   * @param {*} count
   */
  renderNextMonthDays(start, count) {
    const emptyDays = []
    let i = 1
    start = moment(start).add(i, 'days')
    while (count--) {
      emptyDays.push(
        {
          num: '',
          date: null,
          start: start,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        }
      )
      i += 1
      start = moment(start).add(i, 'days')
    }
    return emptyDays
  }

  getAllDays(currDate) {
    const currMonth = moment(currDate).startOf('month')
    const prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'))
    const currMonthDays = this.getMonthDays(currMonth)
    const nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'))
    return [prevMonthDays,currMonthDays, nextMonthDays]
  }

  componentWillReceiveProps(nextProps) {

    if (!isSameDay(nextProps.currentMonth, this.props.currentMonth)) {
      // next date no equal current date recalculate days
      if (nextProps.currentMonth.isBefore(this.props.currentMonth)) {
        // prev
        this.setState({
          movePrev: true,
          moveNext: false
        })
      } else {
        // next
        this.setState({
          movePrev: false,
          moveNext: true
        })
      }

      // set current month not by prev or next btn
      if (!nextProps.isAnimating) {
        this.setState({
          allDays: this.getAllDays(nextProps.currentMonth)
        })
      }
    }
  }

  handleMouseDown(e, date) {
    const { onDateChange } = this.props
    onDateChange && onDateChange(e, date)
  }

  handleMouseEnter(e, date) {
    const { onHoveringDateChange } = this.props
    onHoveringDateChange && onHoveringDateChange(e, date)
  }

  transitionEndHandle(e) {
    if (e.propertyName == 'transform') {
      const { movePrev, moveNext } = this.state
      const { currentMonth, animateEnd } = this.props
      const allDays = this.getAllDays(currentMonth)
      const currAllDays = this.state.allDays
  
      if (movePrev) {
        // prev
        currAllDays.pop()
        currAllDays.unshift(allDays.shift())
  
        this.setState({
          movePrev: false,
          moveNext: false,
          allDays: currAllDays
        }, () => {
          animateEnd()
        })
      }
  
      if (moveNext) {
        // next
        currAllDays.shift()
        currAllDays.push(allDays.pop())
  
        this.setState({
          movePrev: false,
          moveNext: false,
          allDays: currAllDays
        }, () => {
          animateEnd()
        })
      }
    }
  }

  render() {
    const {
      allDays,
      movePrev,
      moveNext
    } = this.state

    const {
      startDate,
      endDate,
      isAnimating,
      range,
      itemRender,
      minDate,
      maxDate,
      disabledDates,
      selectable
    } = this.props


    const renderRowDays = (days) => {
      return days.map(item => {

        const cls = classNames({
          'rdp__days-item--grey': !item.inMonth || item.isDisable,
          'rdp__days-item': true,
          'rdb__days-item-active--connect': item.connect,
          'rdp__days-item-active--start': item.isStart,
          'rdp__days-item-active--end': item.isEnd,
          'rdp__days-item-active--single': !endDate && item.isStart && !range,
	        'rdp__days-item-active--range-start': item.isRangeStart,
	        'rdp__days-item-active--range-end': item.isRangeEnd,
	        'rdp__days-item-active--range-connect': item.isInRange,
        })

        const allowDownEvent = !item.isDisable && item.inMonth && selectable
        const allowHoverEvent = range && item.inMonth && !item.isDisable

        return (
          <div
            className={ cls }
            key={ item.key }
            data-label={ item.dayStr }
            data-key={ item.key }
            onMouseDown={ () => allowDownEvent && this.handleMouseDown(event, item.date) }
            onMouseEnter={ () => allowHoverEvent && this.handleMouseEnter(event, item.date) }>
            { itemRender ? itemRender(item) : item.num  }
          </div>
        )
      })
    }

    const renderDays = (days) => {
      const rowArray = []
      let arr = []
      days.forEach((item, idx) => {
        if (item.date) { // only handle item has date

        	if (this.checkInRange) {
		        const checkRangeRet = this.checkInRange(item.date)
		        item.isRangeStart = checkRangeRet.isRangeStart
		        item.isInRange = checkRangeRet.isInRange
		        item.isRangeEnd = checkRangeRet.isRangeEnd
	        }

          item.isDisable = isDayBefore(item.date, minDate) || isDayAfter(item.date, maxDate) || dateDisabled(disabledDates, item.date)
          if (startDate && endDate) {
            item.isStart = isSameDay(startDate, item.date)
            item.isEnd = isSameDay(endDate, item.date)
            item.active = isSameDay(startDate, item.date) || isSameDay(endDate, item.date)
            item.connect = isDayAfter(item.date, startDate) && isDayBefore(item.date, endDate)
          } else {
            item.isStart =  isSameDay(startDate, item.date)
            item.active = isSameDay(startDate, item.date)
            item.isEnd = isSameDay(endDate, item.date)
            item.connect = false
          }
        } else {
          item.active = false
        }
        if (idx > 0 && idx % 7 === 0) {
          // new row
          rowArray.push(arr)
          arr = []
        }
        arr.push(item)
      })

      // last row
      if (arr.length) {
        rowArray.push(arr)
      }
      return rowArray.map((rowDays, idx) => {
        return (
          <div className="rdp-days__row" key={idx}>
            { renderRowDays(rowDays) }
          </div>
        )
      })
    }

    const renderAllDays = (allDays) => {
      return allDays.map((pageDays, idx) => {
        // base on key format is { YYYYMMDD }
        const key = Object.keys(pageDays)[0]
        const cls = classNames({
          'rdp__view': true,
          'rdp--hidden': !isAnimating && idx !== 1  // the middle is visible
        })
        return (
          <div className={ cls } key={ key }>
            { renderDays(pageDays[key]) }
          </div>
        )
      })
    }

    const cls = classNames({
      'rdp__animation-left': isAnimating && moveNext,
      'rdp__animation-right': isAnimating && movePrev,
      'rdp__body': true
    })

    return (
      <div className={ cls } onTransitionEnd={ this.transitionEndHandle }>
        { renderAllDays(allDays) }
      </div>
    )
  }
}

const propTypes = {
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disabledDates: PropTypes.array,
  currentMonth: PropTypes.object,
  onHoveringDateChange: PropTypes.func,
  onDateChange: PropTypes.func,    // date change event
  isAnimating: PropTypes.bool.isRequired,     // if body is animating
  onDateRangeChange: PropTypes.func,          // day range change event
  range: PropTypes.bool,                      // select day range
  itemRender: PropTypes.func,                 // day item render function
  selectable: PropTypes.bool                   // if selectable
}

const defaultProps = {
  isAnimating: false,
  selectable: true,
  disabledDates: [],
  range: false    // select range date
}

CalendarBody.propTypes = propTypes
CalendarBody.defaultProps = defaultProps

export default CalendarBody