import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from '../Calendar'
import '../../styles/index.scss'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
addLocaleData([{ en: en }])

export default class extends React.Component {

  static propTypes = {
    currentMonth: PropTypes.object
  }

  static defaultProps = {
    currentMonth: moment()
  }

  constructor(props) {
    super(props)

    let { currentMonth, minMonth, maxMonth } = props
    let startDate, endDate;
    
    if (minMonth && minMonth.isAfter(currentMonth)) {
      currentMonth = minMonth
    }

    if (maxMonth && maxMonth.isBefore(currentMonth)) {
      currentMonth = maxMonth
    }

    if (Array.isArray(props.defaultDate)) {
      // range date
      startDate = props.defaultDate[0]
      endDate = props.defaultDate[1]
    } else {
      startDate = props.defaultDate
    }
    
    this.state = {
      animating: false,
      startDate: startDate,
      endDate: endDate,
      hoveringDate: null,
      hidePrevBtn: false,
      hideNextBtn: false,
      isHovering: false,             // is hovering status
      currentMonth: currentMonth    // default is today
    }

    this.onDateChange = this.onDateChange.bind(this)
    this.onHoveringDateChange = this.onHoveringDateChange.bind(this)
  }

  /**
   * hovering day item
   * @param {*} event 
   * @param {*} date 
   */
  onHoveringDateChange(event, date) {
    const { startDate, endDate, isHovering } = this.state
    const { range, onHoveringDateChange } = this.props
    if (range && isHovering) {
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

  /**
   * date change
   * @param {*} event 
   * @param {*} date 
   */
  onDateChange(event, date) {
    const { startDate, endDate } = this.state
    const { range, onDateChange } = this.props
    if (range) {
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
    } else {
      this.setState({
        startDate: date
      })
    }
    onDateChange && onDateChange(event, date)
  }

  render() {

    const { 
      startDate,
      endDate,
      hoveringDate
    } = this.state

    return (
      <IntlProvider locale="en" messages={ en }>
        <Calendar
          { ...this.props }
          startDate={ startDate || hoveringDate }
          endDate={ endDate || hoveringDate }
          onHoveringDateChange={ this.onHoveringDateChange }
          onDateChange={ this.onDateChange }
        />
      </IntlProvider>
    )
  }
}