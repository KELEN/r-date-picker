import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classname'
import { injectIntl, FormattedMessage } from 'react-intl'

function intlTitleFormat(date) {
  return date.format('YYYYMMDD'); //date.format(`YYYY${ formatMessage({ id: "year", defaultMessage: '-' }) }MM${ formatMessage({ id: "month", defaultMessage: '' }) }DD${ formatMessage({ id: 'day', defaultMessage: '-' }) }`)
}

const CalendarHeader = (props) => {
  
  const {
    onPrevClick,
    onNextClick,
    hideNextBtn,
    hidePrevBtn,
    renderPrevBtn,
    renderNextBtn,
    currentMonth
  } = props;

  const prevBtncls = classNames({
    'rdp__prev-btn': true,
    'rdp--hidden': hidePrevBtn
  })

  const nextBtnCls = classNames({
    'rdp__next-btn': true,
    'rdp--hidden': hideNextBtn
  })

  const year = currentMonth.get('year'), month = currentMonth.get('month') + 1

  const TitleFormat = injectIntl(({year, month, day, intl}) => {
    return `${year}${intl.formatMessage({id: 'year'})}${month}${intl.formatMessage({ id: 'month' })}`
  })

  return (
    <div className="rdp__title">
      <span className={ prevBtncls } onClick={ onPrevClick }>
        { renderPrevBtn && renderPrevBtn() }
      </span>   
      <span className="rdp__title-center">
        <TitleFormat year={ year } month={ month } />
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
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  currentMonth: PropTypes.object.isRequired,
  renderPrevBtn: PropTypes.func,
  renderNextBtn: PropTypes.func
}

const defaultProps = {
  hidePrevBtn: false,
  hideNextBtn: false,
  currentMonth: PropTypes.object
}

CalendarHeader.propTypes = propTypes
CalendarHeader.defaultProps = defaultProps

export default CalendarHeader