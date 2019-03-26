import React from 'react'
import Calendar from '../Calendar'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
addLocaleData([{ en: en }])

class DatePicker extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedDate: null
    }
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(event, date) {
    this.setState({
      selectedDate: date
    })
  }

  render() {
    const { selectedDate } = this.state
    return (
      <IntlProvider locale="en" messages={ en }>
        <div className="rdp-range__container">
          <Calendar
            { ...this.props }
            onDateChange={ this.onDateChange } 
            selectedDate={ selectedDate } 
          />
          <Calendar
            { ...this.props }
            onDateChange={ this.onDateChange } 
            selectedDate={ selectedDate } 
          />
          </div>
      </IntlProvider>
    )
  }
}

export default DatePicker