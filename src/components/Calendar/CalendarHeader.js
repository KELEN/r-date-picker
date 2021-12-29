import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classname'

/**
 * Calendar Header
 * @param {*} props 
 */
const CalendarHeader = (props) => {
  
  const {
    onPrevClick,
    onNextClick,
    hideNextBtn,
    hidePrevBtn,
    renderPrevBtn,
    renderNextBtn
  } = props;

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
      <span className="rdp__title-center">
        { props.children }
      </span>
      <span className={ nextBtnCls } onClick={ onNextClick }>
        { renderNextBtn && renderNextBtn() }
      </span>
    </div>
  )
}

const propTypes = {
  hidePrevBtn: PropTypes.bool.isRequired,
  hideNextBtn: PropTypes.bool.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  renderPrevBtn: PropTypes.func,
  renderNextBtn: PropTypes.func
}

const defaultProps = {
  hidePrevBtn: false,
  hideNextBtn: false,
}

CalendarHeader.propTypes = propTypes
CalendarHeader.defaultProps = defaultProps

export default CalendarHeader