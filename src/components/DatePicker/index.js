import React from 'react'
import Calendar from '../Calendar'

class DatePicker extends React.Component {
  render() {
    return (
      <Calendar
        { ...this.props }
      />
    )
  }
}

export default DatePicker