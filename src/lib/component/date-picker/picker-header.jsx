import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  prefixClass,
  prefixClassObject,
} from '@/utils/style';
import {
  dateType,
  childrenType,
} from '@/utils/prop-types';
import {
  getMonthString,
} from '@/utils/dayjs';
import {
  ARROW_PREV,
  ARROW_NEXT,
} from '@/utils/constants';

const PickerHeader = React.memo((props) => {
  const {
    className,
    onNavClick,
    children,
    prevButton,
    nextButton,
  } = props;

  return (
    <div className={className}>
      { children }
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-prev': true,
        })}
        onClick={() => {
          onNavClick(ARROW_PREV);
        }}
      >
        { prevButton }
      </span>
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-next': true,
        })}
        onClick={() => {
          onNavClick(ARROW_NEXT);
        }}
      >
        { nextButton }
      </span>
    </div>
  );
});

PickerHeader.propTypes = {
  onNavClick: PropTypes.func,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  // 方向按钮
  prevButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  nextButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

PickerHeader.defaultProps = {
  onNavClick: null,
  className: '',
  prevButton: 'prev',
  nextButton: 'next',
};

export default PickerHeader;
