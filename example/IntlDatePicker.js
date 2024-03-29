import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.less'

/**
 * 国际化
 */
export default class IntlDatePicker extends React.Component {

  constructor() {
    super()
    this.state = {
      lang: 'cn'
    }
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  handleLanguageChange(e) {
    this.setState({
      lang: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>国际化日历</h3>
        <select onChange={ this.handleLanguageChange }>
          <option value="cn">中文</option>
          <option value="en">英文</option>
        </select>
        <DatePicker language={ this.state.lang }
          headerFormat={'MM/YYYY'}
         />
      </div>
    )
  }
}