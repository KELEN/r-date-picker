import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classname'

export default class CalendarHeader extends React.Component {

  static propTypes = {
    hidePrevBtn: PropTypes.bool.isRequired,
    hideNextBtn: PropTypes.bool.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    currentMonth: PropTypes.object.isRequired
  }

  static defaultProps = {
    hidePrevBtn: false,
    hideNextBtn: false,
    currentMonth: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.currentMonth.format('YYYY-MM-DD')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.currentMonth.format('YYYY-MM-DD')
    })
  }

  render() {

    const {
      title
    } = this.state

    const {
      onPrevClick,
      onNextClick,
      hideNextBtn,
      hidePrevBtn
    } = this.props

    const prevBtncls = classNames({
      'rdp__prev-btn': true,
      'rdp--hidden': hidePrevBtn
    })

    const nextBtnCls = classNames({
      'rdp__next-btn': true,
      'rdp--hidden': hideNextBtn
    })

    return (
      <div className="rdp__title">
        <span className={ prevBtncls } onClick={ onPrevClick }></span> 
        <span className="rdp__title-center">{ title }</span>
        <span className={ nextBtnCls } onClick={ onNextClick }></span>
      </div>
    )
  }
}