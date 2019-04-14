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
        <DatePicker selectable={false} />
      </div>
    )
  }
}