import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
import moment, { max } from 'moment'
import PropTypes from 'prop-types'
addLocaleData([{ en: en }])

class DateRangePicker extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array.isRequired,
    minMonth: PropTypes.object,
    maxMonth: PropTypes.object
  }

  static defaultProps = {
    defaultValue: []
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.defaultValue[0],
      endDate: props.defaultValue[1],
      hoveringDate: null,
      isHovering: false,

      leftMaxMonth: moment(),
      rightMinMonth: moment().add(1, 'month'),

      startMonth: moment(),
      endMonth: moment().add(1, 'month')
    }

    this.onStartMonthChange = this.onStartMonthChange.bind(this)
    this.onEndMonthChange = this.onEndMonthChange.bind(this)
    this.onHoveringDateChange = this.onHoveringDateChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onStartMonthChange(date) {
    this.setState({
      rightMinMonth: date.clone().add(1, 'month')
    })
  }

  onEndMonthChange(date) {
    this.setState({
      leftMaxMonth: date.clone().subtract(1, 'month')
    })
    console.log(this.state.leftMaxMonth.format('YYYY-MM-DD'))
  }

  onDateChange(event, date) {
    const { startDate, endDate } = this.state
    if (!startDate && !endDate) {
      this.setState({
        startDate: date,
        isHovering: true
      })
    } else if (!startDate) {
      this.setState({
        startDate: date,
        isHovering: !endDate
      })
    } else if (!endDate) {
      if (date.isBefore(startDate)) {
        this.setState({
          startDate: date,
          endDate: startDate,
          isHovering: !startDate
        })
      } else {
        this.setState({
          endDate: date,
          isHovering: !startDate
        })
      }
    } else {
      this.setState({
        startDate: date,
        endDate: null,
        isHovering: true,
        hoveringDate: null
      })
    }
  }

  onHoveringDateChange(event, date) {
    const { startDate, endDate, isHovering } = this.state
    const { onHoveringDateChange } = this.props
    if (isHovering) {
      this.setState({
        hoveringDate: date
      })
      if (startDate && startDate.isAfter(date)) {
        this.setState({
          startDate: null,
          endDate: startDate
        })
      } else if (endDate && endDate.isBefore(date)) {
        this.setState({
          startDate: endDate,
          endDate: null
        })
      }
    }
    onHoveringDateChange && onHoveringDateChange(event, date)
  }

  render() {
    const { 
      startDate,
      endDate,
      startMonth,
      endMonth,
      hoveringDate,
      leftMaxMonth,
      rightMinMonth
    } = this.state

    const {
      minMonth,
      maxMonth
    } = this.props

    return (
      <IntlProvider locale="en" messages={ en }>
        <div className="rdp-range__container">
          <div className="rdp-range__calendar rdp-range__left">
            <Calendar
              { ...this.props }
              range={ true }
              minMonth={ minMonth }
              maxMonth={ leftMaxMonth }
              startDate={ startDate || hoveringDate }
              endDate={ endDate || hoveringDate }
              currentMonth={ startMonth }
              onHoveringDateChange={ this.onHoveringDateChange }
              onMonthChange={ this.onStartMonthChange }
              onDateChange={ this.onDateChange }
            />
          </div>
          <div className="rdp-range__calendar rdp-range__right">
            <Calendar
              { ...this.props }
              range={ true }
              minMonth={ rightMinMonth }
              maxMonth={ maxMonth }
              startDate={ startDate || hoveringDate }
              endDate={ endDate || hoveringDate }
              currentMonth={ endMonth }
              onHoveringDateChange={ this.onHoveringDateChange }
              onMonthChange={ this.onEndMonthChange }
              onDateChange={ this.onDateChange } 
            />
            </div>
          </div>
      </IntlProvider>
    )
  }
}

export default DateRangePicker