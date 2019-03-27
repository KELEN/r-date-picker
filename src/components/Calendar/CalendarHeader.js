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
      <div className="rdp__title">
        <span className="rdp__prev-btn" onClick={ onPrevClick }></span> 
        <span className="rdp__title-center">{ this.props.title }</span>
        <span className="rdp__next-btn" onClick={ onNextClick }></span>
      </div>
    )
  }
}