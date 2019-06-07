import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider } from 'react-intl'
import moment, { lang } from 'moment'
import PropTypes from 'prop-types'
import en_US from '../../languages/en'
import zh_CN from '../../languages/zh-CN'
import classNames from 'classname'
import EnhanceCalendar from '../Calendar/EnhanceCalendar'

const messages = {
  en: en_US,
  zh_CN: zh_CN
}

class DateRangePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      leftMaxDate: moment().endOf('month'),
      rightMinDate: moment().add(1, 'month').startOf('month'),
      startMonth: moment(),
      endMonth: moment().add(1, 'month')
    }

    this.onStartMonthChange = this.onStartMonthChange.bind(this)
    this.onEndMonthChange = this.onEndMonthChange.bind(this)
  }

  onStartMonthChange(date) {
    this.setState({
      startMonth: date,
      rightMinDate: date.clone().add(1, 'month').startOf('month')
    })
  }

  onEndMonthChange(date) {
    this.setState({
      endMonth: date,
      leftMaxDate: date.clone().subtract(1, 'month').endOf('month')
    })
  }

  render() {
    const {
      startMonth,
      endMonth,
      leftMaxDate,
      rightMinDate
    } = this.state

    const {
	    startDate,
	    endDate,
	    hoveringDate,
      minDate,
      maxDate,
      className,
      single,     // single calendar
      language = 'zh_CN'
    } = this.props

    const cls = classNames({
      [className]: !!className,
      'rdp-range__container': true
    })

    return (
      <IntlProvider locale="en" messages={ messages[language] }>
          { !single ? 
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
                  onMonthChange={ this.onStartMonthChange }
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
                  onMonthChange={ this.onEndMonthChange }
                />
              </div>
            </div>
            : 
            <div className={ cls }>
              <Calendar
                { ...this.props }
                range={ true }
                minDate={ minDate }
                maxDate={ maxDate }
                startDate={ startDate || hoveringDate }
                endDate={ endDate || hoveringDate }
                currentMonth={ endMonth }
                onMonthChange={ this.onEndMonthChange }
              />
            </div>
          }
      </IntlProvider>
    )
  }
}

DateRangePicker.propTypes = {
  defaultValue: PropTypes.array.isRequired,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  single: PropTypes.bool
}

DateRangePicker.defaultProps = {
  defaultValue: [],
  minDate: null,
  maxDate: null,
  single: false
}

export default EnhanceCalendar(DateRangePicker, { range: true })
