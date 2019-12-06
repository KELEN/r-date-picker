import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import { injectIntl } from 'react-intl';

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
    renderNextBtn,
    intl: {
      messages,
    },
    date,
    onHeaderClick,
  } = props;

  const prevBtncls = classNames({
    'rdp__prev-btn': true,
    'rdp--hidden': hidePrevBtn,
  });

  const nextBtnCls = classNames({
    'rdp__next-btn': true,
    'rdp--hidden': hideNextBtn,
  });


  const year = date.get('year');
  const month = date.get('month') + 1;

  return (
    <div className="rdp__title">
      <span className={prevBtncls} onClick={onPrevClick}>
        { renderPrevBtn && renderPrevBtn() }
      </span>
      <span className="rdp__title-center">
        <span onClick={onHeaderClick}>
          { `${year}${messages.year}${month}${messages.month}` }
        </span>
      </span>
      <span className={nextBtnCls} onClick={onNextClick}>
        { renderNextBtn && renderNextBtn() }
      </span>
    </div>
  );
};

CalendarHeader.propTypes = {
  hidePrevBtn: PropTypes.bool.isRequired,
  hideNextBtn: PropTypes.bool.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  renderPrevBtn: PropTypes.func,
  renderNextBtn: PropTypes.func,
};

export default injectIntl(CalendarHeader);
