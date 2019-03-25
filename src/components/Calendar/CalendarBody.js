import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classname'

export default class CalendarBody extends React.Component {

  static propTypes = {
    currDate: PropTypes.object.isRequired,
    onDayClick: PropTypes.func.isRequired,
    selectedDate: PropTypes.object,
    isAnimating: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isAnimating: false
  }

  constructor(props) {
    super(props)

    this.state = {
      allDays: [],
      focusDate: null,
      moveNext: false,
      movePrev: false
    }

    this.renderCurrentMonthDays = this.renderCurrentMonthDays.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)

    this.transitionContainerRef = this.transitionContainerRef.bind(this)
    this.transitionEndHandle = this.transitionEndHandle.bind(this)
  }

  getMonthDays(startOfMonth) {
    const daysInMonth = startOfMonth.daysInMonth()   // total num in month
    const startNum = startOfMonth.weekday()  // the first weekday
    return {
      [startOfMonth.format('YYYYMMDD')]: [...this.renderLastMonthDays(startOfMonth, startNum), ...this.renderCurrentMonthDays(startOfMonth, daysInMonth)]
    }
  }

  /**
   * render last month
   */
  renderLastMonthDays(firstDay, count) {
    const emptyDays = []
    let start = moment(firstDay).subtract(count, 'days')
    let i = -1
    while (count--) {
      emptyDays.push(
        {
          num: Number(start.format('DD')),
          date: start,
          key: start.format('YYYYMMDD'),
          inMonth: false
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
          key: date.format('YYYYMMDD'),
          inMonth: true
        }
      )
      i++
    }
    return realDays
  }

  componentDidMount() {
    const allDays = this.getAllDays(this.props.currDate)
    this.setState({
      allDays: allDays
    })
  }

  getAllDays(currDate) {
    const currMonth = moment(currDate).startOf('month')
    const prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'))
    const currMonthDays = this.getMonthDays(currMonth)
    const nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'))
    return [prevMonthDays,currMonthDays, nextMonthDays]
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currDate !== this.props.currDate) {
      // next date no equal current date recalculate days
      if (nextProps.currDate.isBefore(this.props.currDate)) {
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
    }
    if (nextProps.selectedDate) {
      this.setState({
        focusDate: nextProps.selectedDate
      })
    }
  }

  handleMouseDown(e, date) {
    this.props.onDayClick(e, date)
  }

  transitionContainerRef(ref) {
    this.transitionContainer = ref
  }

  transitionEndHandle(e) {
    const { movePrev, moveNext } = this.state
    const { currDate, animateEnd } = this.props
    const allDays = this.getAllDays(currDate)
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

  render() {
    const {
      focusDate,
      allDays,
      movePrev,
      moveNext
    } = this.state

    const { isAnimating } = this.props

    const renderDays = (days) => {
      return days.map(item => {
        const cls = classNames({
          'r-date-picker__days-item--grey': !item.inMonth,
          'r-date-picker__days-item': true,
          'r-date-picker__days-item-active': focusDate ? item.key === focusDate.key : false
        })
        return (
          <div onMouseDown={ () => this.handleMouseDown(event, item) } data-label={ item.dayStr } className={ cls } key={ item.key }>{ item.num }</div>
        )
      })
    }

    const renderAllDays = (allDays) => {
      return allDays.map((pageDays, idx) => {
        // base on key format is { YYYYMMDD }
        const key = Object.keys(pageDays)[0]
        const cls = classNames({
          'r-date-picker__view': true,
          'r-date-picker__view--hidden': !isAnimating && idx !== 1  // the middle is visible
        })
        return (
          <div className={ cls } key={ key }>
            { renderDays(pageDays[key]) }
          </div>
        )
      })
    }

    const cls = classNames({
      'r-date-picker__animation-left': isAnimating && moveNext,
      'r-date-picker__animation-right': isAnimating && movePrev,
      'r-date-picker__body': true
    })

    return (
      <div ref={ this.transitionContainerRef } className={ cls } onTransitionEnd={ this.transitionEndHandle }>
        { renderAllDays(allDays) }
      </div>
    )
  }
}