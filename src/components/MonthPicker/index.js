import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import CalendarHeader from '../Calendar/CalendarHeader'
import MonthBody from './MonthBody'
import { noop } from '../../utils/helper'

/**
 * month picker
 */
class MonthPicker extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      defaultValue: props.defaultValue
    }
  }

  onPrevClick = () => {
    this.setState({
      defaultValue: this.state.defaultValue.subtract(1, 'year')
    })
  }

  onNextClick = () => {
    this.setState({
      defaultValue: this.state.defaultValue.add(1, 'year')
    })
  }

  onMonthClick = (num) => {
    const {
      onMonthChange
    } = this.props

    const newDate = moment({
      y: this.state.defaultValue.format('YYYY'),
      M: num - 1,
      d: this.props.defaultValue.format('D')
    })

    this.setState({
      defaultValue: newDate
    })

    onMonthChange(newDate)
  }

  render() {
    const {
      defaultValue
    } = this.state

    const {
      className,
      style,
      minDate,
    } = this.props

    const cls = `rdp__month-container ${className}`

    return (
      <div className={ cls } style={ style }>
        <CalendarHeader
          onPrevClick={ this.onPrevClick }
          onNextClick={ this.onNextClick }
        >
          { defaultValue.format('YYYY') }
        </CalendarHeader>
        <MonthBody
          minDate={minDate}
          onMonthClick={ this.onMonthClick }
          month={ defaultValue.format('M') }
        />
      </div>
    )
  }
}

MonthPicker.propTypes = {
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
  defaultValue: PropTypes.object,
  onMonthChange: PropTypes.func
}

MonthPicker.defaultProps = {
  minDate: null,
  defaultValue: moment(),
  onMonthChange: noop
}

export default MonthPicker