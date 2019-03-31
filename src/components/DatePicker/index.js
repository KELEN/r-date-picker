import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Calendar from '../Calendar'
import '../../styles/index.scss'
import { IntlProvider } from 'react-intl'
import en from '../../languages/en'
import zh_CN from '../../languages/zh-CN'
import EnhanceCalendar from '../Calendar/EnhanceCalendar'

const messages = {
  en: en,
  cn: zh_CN
}

class DatePicker extends React.Component {

  static propTypes = {
    // default selected dates
    defaultDate: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    // init visible current month, default is current month
    currentMonth: PropTypes.object,
	  // set range
	  ranges: PropTypes.array
  }

  static defaultProps = {
    currentMonth: moment(),
    defaultDate: null,
	  ranges: []
  }

  constructor(props) {
    super(props)
    const { currentMonth } = props
    this.state = {
      currentMonth: currentMonth     // default is today
    }
  }

  render() {
    const {
      language = 'cn',
	    startDate,
	    endDate,
	    hoveringDate,
    } = this.props

    return (
      <IntlProvider locale='en' messages={ messages[language] }>
        <Calendar
          { ...this.props }
          startDate={ startDate || hoveringDate }
          endDate={ endDate || hoveringDate }
        />
      </IntlProvider>
    )
  }
}

export default EnhanceCalendar(DatePicker)
