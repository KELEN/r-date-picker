import React from 'react'
import PropTypes from 'prop-types'
import './styles/index.scss'
import DatePicker from './components/DatePicker'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from './languages/en'
addLocaleData([{ en: en }])

export default class extends React.Component {

  static propTypes = {
    range: PropTypes.bool  // 时间范围选择
  }

  static get defaultProps() {
    return {
      range: false
    }
  }

  constructor() {
    super()
    this.state = {
      startDate: new Date()
    }
  }

  render() {
    return (
      <IntlProvider locale="en" messages={ en }>
        <DatePicker { ...this.props } />
      </IntlProvider>
    )
  }
}