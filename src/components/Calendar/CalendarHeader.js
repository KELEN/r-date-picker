import React from 'react'
import PropTypes from 'prop-types'

export default class CalendarHeader extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  constructor() {
    super()
  }

  render() {
    const { onPrevClick, onNextClick } = this.props
    return (
      <div className="r-date-picker__title">
        <span onClick={ onPrevClick }>prev</span> { this.props.title } <span onClick={ onNextClick }>next</span>
      </div>
    )
  }
}