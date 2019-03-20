import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classname'

export default class CalendarBody extends React.Component {

  static propTypes = {
    currDate: PropTypes.object.isRequired,
    onDayClick: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      days: []
    }

    this.renderCurrentMonthDays = this.renderCurrentMonthDays.bind(this)
    this.renderCurrentMonth = this.renderCurrentMonth.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
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
          num: start.format('DD'),
          date: start,
          key: i--
        }
      )
      start = moment(firstDay).subtract(count, 'days')
    }
    return emptyDays.map(item => (
      <div
        className="r-date-picker__days-item r-date-picker__days-item--grey" 
        key={ item.key }>
        {/* { item.num } */}
      </div>
    ))
  }

  /**
   * render current month
   */
  renderCurrentMonthDays(firstDay, count) {
    const realDays = []
    let i = 1
    while (count--) {
      realDays.push(
        {
          num: i,
          active: false,
          date: moment(firstDay).add(i - 1, 'days'),
          key: i
        }
      )
      i++
    }
    return realDays.map(item => {
      const cls = classNames({
        'r-date-picker__days-item': true,
        'r-date-picker__days-item-active': item.active
      })
      return (
        <div onMouseDown={ () => this.handleMouseDown(item.date) } data-label={ item.dayStr } className={ cls } key={ item.key }>{ item.num }</div>
      )
    })
  }

  /**
   * render current month
   */
  renderCurrentMonth = function() {
    const { currDate } = this.props
    const firstDay = moment(currDate).startOf('month')  // the first day of month
    const daysInMonth = moment(currDate).daysInMonth()   // total num in month
    const startNum = firstDay.weekday()  // the first weekday
    return [...this.renderLastMonthDays(firstDay, startNum), ...this.renderCurrentMonthDays(firstDay, daysInMonth)]
  }

  handleMouseDown(e) {
    const target = e.target
    const { onDayClick } = this.props
  }

  render() {
    return (
      <div className="r-date-picker___days">
        { this.renderCurrentMonth() }
      </div>
    )
  }
}