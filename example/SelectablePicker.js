import React from 'react'
import DatePicker from '../src/components/DatePicker'
import './style.scss'

/**
 * 国际化
 */
export default class SelectablePicker extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h3>纯展示日历</h3>
        <DatePicker selectable={false} />
      </div>
    )
  }
}