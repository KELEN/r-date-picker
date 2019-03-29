import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider, addLocaleData } from 'react-intl'
import moment, { lang } from 'moment'
import PropTypes from 'prop-types'
import en_US from '../../languages/en'
import zh_CN from '../../languages/zh-CN'
import classNames from 'classname'

const messages = {
  en: en_US,
  zh_CN: zh_CN
}

class DateRangePicker extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object
  }

  static defaultProps = {
    defaultValue: [],
    minDate: null,
    maxDate: null
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.defaultValue[0],
      endDate: props.defaultValue[1],
      hoveringDate: null,
      isHovering: false,

      leftMaxDate: moment(),
      rightMinDate: moment().add(1, 'month'),

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
      startMonth: date,
      rightMinDate: date.clone().add(1, 'month')
    })
  }

  onEndMonthChange(date) {
    this.setState({
      endMonth: date,
      leftMaxDate: date.clone().subtract(1, 'month')
    })
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
      leftMaxDate,
      rightMinDate
    } = this.state

    const {
      minDate,
      maxDate,
      className,
      language = 'zh_CN'
    } = this.props


    const cls = classNames({
      [className]: !!className,
      'rdp-range__container': true
    })

    return (
      <IntlProvider locale="en" messages={ messages[language] }>
        <div className={ cls }>
          <div className="rdp-range__calendar rdp-range__left">
            <Calendar
              { ...this.props }
              range={ true }
              minDate={ minDate }
              maxDate={ leftMaxDate }
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
              minDate={ rightMinDate }
              maxDate={ maxDate }
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