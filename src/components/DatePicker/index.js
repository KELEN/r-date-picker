import React from 'react'
import Calendar from '../Calendar'

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
      <Calendar
        { ...this.props }
        onDateChange={ this.onDateChange } 
        selectedDate={ selectedDate } 
      />
    )
  }
}

export default DatePicker