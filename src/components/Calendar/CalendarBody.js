import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classname'

export default class CalendarBody extends React.Component {

  static propTypes = {
    startDate: PropTypes.object.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func,   // day range change event
    selectedDate: PropTypes.object,
    isAnimating: PropTypes.bool.isRequired,
    range: PropTypes.bool
  }

  static defaultProps = {
    isAnimating: false,
    range: false    // select range date
  }

  constructor(props) {
    super(props)

    this.state = {
      allDays: [],
      hoveringDate: null,
      startDate: null,  // start date
      endDate: null,    // end date
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
          num: '',
          date: null,
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
          isStart: false,
          isEnd: false,
          key: date.format('YYYYMMDD'),
          inMonth: true
        }
      )
      i++
    }
    return realDays
  }

  getAllDays(currDate) {
    const currMonth = moment(currDate).startOf('month')
    const prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'))
    const currMonthDays = this.getMonthDays(currMonth)
    const nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'))
    return [prevMonthDays,currMonthDays, nextMonthDays]
  }

  componentDidMount() {
    const allDays = this.getAllDays(this.props.startDate)
    this.setState({
      allDays: allDays
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate !== this.props.startDate) {
      // next date no equal current date recalculate days
      if (nextProps.startDate.isBefore(this.props.startDate)) {
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
        startDate: nextProps.selectedDate
      })
    }
  }

  handleMouseDown(e, date) {
    const { startDate, endDate } = this.state
    const { range, onDateRangeChange } = this.props

    if (range) {
      if (startDate && endDate) {
        this.setState({
          startDate: date,
          endDate: null
        })
      } else {
        if (!startDate) {
          this.setState({
            startDate: date
          })
        } else {
          if (date.date.isBefore(startDate.date)) {
            this.setState({
              startDate: date,
              endDate: startDate
            })
            onDateRangeChange && onDateRangeChange({
              startDate: date,
              endDate: startDate
            })
          } else {
            this.setState({
              endDate: date
            })
            onDateRangeChange && onDateRangeChange({
              startDate: startDate,
              endDate: date
            })
          }
        }
      }
    } else {
      this.setState({
        startDate: date
      })
    }
  }

  handleMouseEnter(e, date) {
    const { startDate } = this.state
    const { range } = this.props
    if (range && startDate) {
      this.setState({
        hoveringDate: date
      })
    }
  }

  transitionContainerRef(ref) {
    this.transitionContainer = ref
  }

  transitionEndHandle(e) {
    const { movePrev, moveNext } = this.state
    const { startDate, animateEnd } = this.props
    const allDays = this.getAllDays(startDate)
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
      startDate,
      endDate,
      allDays,
      movePrev,
      moveNext
    } = this.state

    const { 
      isAnimating,
      range
    } = this.props

    const renderDays = (days) => {
      return days.map(item => {

        if (item.date) {
          // only handle item has date
          if (startDate && endDate) {
            item.isStart = startDate.date.isSame(item.date)
            item.isEnd = endDate.date.isSame(item.date)
            item.active = startDate.date.isSame(item.date) || endDate.date.isSame(item.date) || (item.date.isAfter(startDate.date) && item.date.isBefore(endDate.date))
          } else {
            item.isStart = startDate && startDate.date.isSame(item.date)
            item.active = startDate && startDate.date.isSame(item.date)
            item.isEnd = endDate && startDate.date.isSame(item.date)
          }
        
        } else {
          item.active = false
        }

        const cls = classNames({
          'rdp__days-item--grey': !item.inMonth,
          'rdp__days-item': true,
          'rdp__days-item-active--start': item.isStart,
          'rdp__days-item-active--end': item.isEnd,
          'rdp__days-item-active': item.isStart || item.isEnd || item.active
        })
        return (
          <div 
            className={ cls }
            key={ item.key }
            data-label={ item.dayStr }  
            onMouseDown={ () => item.inMonth && this.handleMouseDown(event, item) } 
            onMouseEnter={ () => range && item.inMonth && this.handleMouseEnter(event, item) }>
            { item.num }
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
          'rdp__view--hidden': !isAnimating && idx !== 1  // the middle is visible
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
      <div ref={ this.transitionContainerRef } className={ cls } onTransitionEnd={ this.transitionEndHandle }>
        { renderAllDays(allDays) }
      </div>
    )
  }
}