import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classname'
import { injectIntl, FormattedMessage } from 'react-intl'

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
  }

  intlTitleFormat(date) {
    return date.format('YYYYMMDD'); //date.format(`YYYY${ formatMessage({ id: "year", defaultMessage: '-' }) }MM${ formatMessage({ id: "month", defaultMessage: '' }) }DD${ formatMessage({ id: 'day', defaultMessage: '-' }) }`)
  }

  render() {

    const {
      onPrevClick,
      onNextClick,
      hideNextBtn,
      hidePrevBtn,
      renderPrevBtn,
      renderNextBtn,
      currentMonth
    } = this.props

    const prevBtncls = classNames({
      'rdp__prev-btn': true,
      'rdp--hidden': hidePrevBtn
    })

    const nextBtnCls = classNames({
      'rdp__next-btn': true,
      'rdp--hidden': hideNextBtn
    })

    const year = currentMonth.get('year'), month = currentMonth.get('month') + 1, day = currentMonth.get('day')

    const TitleFormat = injectIntl(({year, month, day, intl}) => {
      return `${year}${intl.formatMessage({id: 'year'})}${month}${intl.formatMessage({ id: 'month' })}${day}${intl.formatMessage({ id: 'day', defaultMessage: '' })}`
    })

    return (
      <div className="rdp__title">
        <span className={ prevBtncls } onClick={ onPrevClick }>
          { renderPrevBtn && renderPrevBtn() }
        </span>   
        <span className="rdp__title-center">
          <TitleFormat year={ year } month={ month } day={ day } />
        </span>
        <span className={ nextBtnCls } onClick={ onNextClick }>
          { renderNextBtn && renderNextBtn() }
        </span>
      </div>
    )
  }
}