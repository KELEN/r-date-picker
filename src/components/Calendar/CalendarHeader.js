import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classname'
import { formatMessage } from 'react-intl'

export default class CalendarHeader extends React.Component {

  static propTypes = {
    hidePrevBtn: PropTypes.bool.isRequired,
    hideNextBtn: PropTypes.bool.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    currentMonth: PropTypes.object.isRequired,
    renderPrevBtn: PropTypes.func,
    renderNextBtn: PropTypes.func
  }

  static defaultProps = {
    hidePrevBtn: false,
    hideNextBtn: false,
    currentMonth: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.intlTitleFormat(props.currentMonth)
    }
  }

  intlTitleFormat(date) {
    return date.format('YYYYMMDD'); //date.format(`YYYY${ formatMessage({ id: "year", defaultMessage: '-' }) }MM${ formatMessage({ id: "month", defaultMessage: '' }) }DD${ formatMessage({ id: 'day', defaultMessage: '-' }) }`)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: this.intlTitleFormat(nextProps.currentMonth)
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
      hidePrevBtn,
      renderPrevBtn,
      renderNextBtn
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
        <span className={ prevBtncls } onClick={ onPrevClick }>
          { renderPrevBtn && renderPrevBtn() }
        </span>   
        <span className="rdp__title-center">{ title }</span>
        <span className={ nextBtnCls } onClick={ onNextClick }>
          { renderNextBtn && renderNextBtn() }
        </span>
      </div>
    )
  }
}