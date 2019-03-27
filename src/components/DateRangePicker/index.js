import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
import moment from 'moment'
import PropTypes from 'prop-types'
addLocaleData([{ en: en }])

class DateRangePicker extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array.isRequired,
    min: PropTypes.object,
    max: PropTypes.object
  }

  static defaultProps = {
    defaultValue: []
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.defaultValue[0],
      endDate: props.defaultValue[1],
      min: props.min,
      max: props.max,
      hoveringDate: null
    }

    this.onHoveringDateChange = this.onHoveringDateChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(event, date) {
    const { startDate, endDate } = this.state
    if (startDate && endDate) {
      this.setState({
        startDate: date,
        endDate: null,
        hoveringDate: null
      })
    } else if (startDate && !endDate) {
      if (startDate.isAfter(date)) {
        this.setState({
          startDate: date,
          endDate: startDate,
          hoveringDate: null
        })
      } else {
        this.setState({
          endDate: date
        })
      }
    } else {
      this.setState({
        startDate: date,
        hoveringDate: null
      })
    }
  }

  onHoveringDateChange(event, date) {
    const { startDate, endDate } = this.state

    if (startDate && endDate) return

    if (startDate && !endDate) {
      // handle hover event
      if (startDate.isAfter(date)) {
        this.setState({
          startDate: null,
          endDate: startDate
        })
      } else {
        this.setState({
          hoveringDate: date
        })
      }
    }
    if (!startDate && endDate) {
      if (endDate.isBefore(date)) {
        this.setState({
          startDate: endDate,
          endDate: null
        })
      }
    }
    this.setState({
      hoveringDate: date
    })
  }

  render() {
    const { startDate, endDate, hoveringDate } = this.state
    const { min, max } = this.props

    console.log(startDate && startDate.format('YYYYMMDD'), endDate && endDate.format('YYYYMMDD'), hoveringDate && hoveringDate.format('YYYYMMDD'))
    return (
      <IntlProvider locale="en" messages={ en }>
        <div className="rdp-range__container">
          <div className="rdp-range__calendar rdp-range__left">
            <Calendar
              { ...this.props }
              max={ min }
              range={ true }
              defaultDate={ [ startDate || hoveringDate, endDate || hoveringDate ] }
              onHoveringDateChange={ this.onHoveringDateChange }
              onDateChange={ this.onDateChange }
            />
          </div>
          <div className="rdp-range__calendar rdp-range__right">
            <Calendar
              { ...this.props }
              range={ true }
              min={ startDate && startDate.clone().add(1, 'month') }
              defaultDate={ [ startDate || hoveringDate, endDate || hoveringDate ] }
              onHoveringDateChange={ this.onHoveringDateChange }
              onDateChange={ this.onDateChange } 
            />
            </div>
          </div>
      </IntlProvider>
    )
  }
}

export default DateRangePicker