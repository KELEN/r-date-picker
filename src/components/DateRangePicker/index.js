import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
import moment from 'moment'
import PropTypes from 'prop-types'
addLocaleData([{ en: en }])

class DateRangePicker extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array.isRequired
  }

  static defaultProps = {
    defaultValue: []
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: props.defaultValue[0],
      endDate: props.defaultValue[1],
      hoveringDate: null
    }

    this.onHoveringDateChange = this.onHoveringDateChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(event, date) {
    const { startDate, endDate } = this.state
    console.log(startDate, endDate)
    if (startDate && endDate) {
      this.setState({
        startDate: date,
        endDate: null
      }) 
    } else if (startDate && !endDate) {
      if (startDate.isAfter(date)) {
        this.setState({
          startDate: date,
          endDate: startDate
        })
      } else {
        this.setState({
          endDate: date
        })
      }
     
    } else {
      this.setState({
        startDate: date
      })
    }
  }

  onHoveringDateChange(event, date) {
    const { startDate, endDate } = this.state
    if (!endDate) {
      // handle hover event
      if (startDate.isAfter(date)) {
        this.setState({
          startDate: date,
          hoveringDate: startDate
        })
      } else {
        this.setState({
          hoveringDate: date
        })
      }
    }
  }

  render() {
    const { startDate, endDate, hoveringDate } = this.state

    console.log(startDate && startDate.format('YYYYMMDD'), endDate && endDate.format('YYYYMMDD'))

    return (
      <IntlProvider locale="en" messages={ en }>
        <div className="rdp-range__container">
          <Calendar
            { ...this.props }
            max={ endDate }
            range={ true }
            defaultDate={ [ startDate, endDate || hoveringDate ] }
            onHoveringDateChange={ this.onHoveringDateChange }
            onDateChange={ this.onDateChange }
          />
          <Calendar
            { ...this.props }
            range={ true }
            min={ endDate && endDate.clone().add(1, 'month') }
            defaultDate={ [ startDate, endDate || hoveringDate ] }
            onHoveringDateChange={ this.onHoveringDateChange }
            onDateChange={ this.onDateChange } 
          />
          </div>
      </IntlProvider>
    )
  }
}

export default DateRangePicker