import React from 'react'
import Calendar from '../Calendar'

class DatePicker extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedDate: null
    }
    this.onDayClick = this.onDayClick.bind(this)
  }

  onDayClick(event, date) {
    this.setState({
      selectedDate: date
    })
  }

  render() {
    const { selectedDate } = this.state
    return (
      <Calendar onDayClick={ this.onDayClick } selectedDate={ selectedDate } />
    )
  }
}

export default DatePicker