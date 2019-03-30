import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from '../Calendar'
import '../../styles/index.scss'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from '../../languages/en'
import zh_CN from '../../languages/zh-CN'
import {isSameDays} from "../../utils/timer";

const messages = {
  en: en,
  cn: zh_CN
}

export default class extends React.Component {

  static propTypes = {
    // default selected dates
    defaultDate: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    onDateRangeChange: PropTypes.func,
    // init visible current month, default is current month
    currentMonth: PropTypes.object
  }

  static defaultProps = {
    currentMonth: moment(),
    defaultDate: null
  }

  constructor(props) {
    super(props)

    const { currentMonth } = props
    let startDate, endDate;

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
      currentMonth: currentMonth     // default is today
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
    const { range, onDateChange, onDateRangeChange } = this.props
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
        onDateRangeChange && onDateRangeChange([date, endDate])
      } else if (!endDate) {
        if (date.isBefore(startDate)) {
          this.setState({
            startDate: date,
            endDate: startDate,
            isHovering: !startDate
          })
          onDateRangeChange && onDateRangeChange([date, startDate])
        } else {
          this.setState({
            endDate: date,
            isHovering: !startDate
          })
          onDateRangeChange && onDateRangeChange([startDate, date])
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

  componentWillReceiveProps(nextProps) {
    const { onDateRangeChange } = this.props
    let startDate, endDate
    if (nextProps.defaultDate && !isSameDays(this.props.defaultDate, nextProps.defaultDate)) {
      if (Array.isArray(nextProps.defaultDate)) {
        // range date
        startDate = nextProps.defaultDate[0]
        endDate = nextProps.defaultDate[1]
      } else {
        startDate = nextProps.defaultDate
      }
      this.setState({
        startDate: startDate,
        endDate: endDate
      })
      onDateRangeChange && onDateRangeChange([ startDate, endDate ])
    }
  }

  render() {

    const {
      startDate,
      endDate,
      hoveringDate
    } = this.state

    const {
      language = 'cn'
    } = this.props

    return (
      <IntlProvider locale='en' messages={ messages[language] }>
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
