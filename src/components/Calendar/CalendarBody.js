import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classname'

export default class CalendarBody extends React.Component {

  static propTypes = {
    onDateChange: PropTypes.func,    // date change event
    isAnimating: PropTypes.bool.isRequired,     // if body is animating
    onDateRangeChange: PropTypes.func,          // day range change event
    range: PropTypes.bool,                      // select day range
    itemRender: PropTypes.func                  // day item render function
  }

  static defaultProps = {
    isAnimating: false,
    range: false    // select range date
  }

  constructor(props) {
    super(props)

    this.state = {
      allDays: this.getAllDays(props.startDate),
      hoveringDate: null,
      startDate: null,             // start date
      endDate: null,                            // end date
      focusDate: null,
      moveNext: false,
      movePrev: false
    }

    if (props.range && Array.isArray(props.defaultDate)) {
      this.state.startDate = props.defaultDate[0]
      this.state.endDate = props.defaultDate[1]
    } else {
      this.state.startDate = props.defaultDate
    }

    this.renderCurrentMonthDays = this.renderCurrentMonthDays.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)

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
          connect: false,
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

    if (!nextProps.range) {
      this.setState({
        startDate: nextProps.defaultDate
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
          if (date.isBefore(startDate)) {
            this.setState({
              startDate: date,
              endDate: startDate
            })
            onDateRangeChange && onDateRangeChange([date, startDate])
          } else {
            this.setState({
              endDate: date
            })
            onDateRangeChange && onDateRangeChange([startDate, date])
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
    // only handle range select
    if (range && startDate) {
      this.setState({
        hoveringDate: date
      })
    }
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
      hoveringDate,
      allDays,
      movePrev,
      moveNext
    } = this.state

    const { 
      isAnimating,
      range,
      itemRender
    } = this.props

    const renderRowDays = (days) => {
      return days.map(item => {
        const cls = classNames({
          'rdp__days-item--grey': !item.inMonth,
          'rdp__days-item': true,
          'rdp__days-item-active--start': item.isStart,
          'rdp__days-item-active--end': item.isEnd,
          'rdb__days-item-active--connect': item.connect,
          'rdp__days-item-active--single': !range && item.active
        })

        return (
          <div 
            className={ cls }
            key={ item.key }
            data-label={ item.dayStr }  
            onMouseDown={ () => item.inMonth && this.handleMouseDown(event, item.date) } 
            onMouseEnter={ () => range && item.inMonth && this.handleMouseEnter(event, item) }>
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
          if (startDate && endDate) {
            item.isStart = startDate.isSame(item.date)
            item.isEnd = endDate.isSame(item.date)
            item.active = startDate.isSame(item.date) || endDate.isSame(item.date)
            item.connect = item.date.isAfter(startDate) && item.date.isBefore(endDate)
          } else if (startDate && hoveringDate) {
            // handle hoving date
            if (hoveringDate.date.isAfter(startDate)) {
              item.isStart = startDate.isSame(item.date)
              item.isEnd = hoveringDate.date.isSame(item.date)
              item.connect = item.date.isAfter(startDate) && item.date.isBefore(hoveringDate.date)
            } else {
              item.isStart = hoveringDate.date.isSame(item.date)
              item.isEnd = startDate.isSame(item.date)
              item.connect = item.date.isBefore(startDate) && item.date.isAfter(hoveringDate.date)
            }
            item.active = startDate.isSame(item.date) || hoveringDate.date.isSame(item.date)
          } else {
            item.isStart = startDate && startDate.isSame(item.date)
            item.active = startDate && startDate.isSame(item.date)
            item.isEnd = endDate && startDate.isSame(item.date)
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
      <div className={ cls } onTransitionEnd={ this.transitionEndHandle }>
        { renderAllDays(allDays) }
      </div>
    )
  }
}