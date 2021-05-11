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
        prev
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
        next
      </span>
    </div>
  );
});

PickerHeader.propTypes = {
  onNavClick: PropTypes.func,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

PickerHeader.defaultProps = {
  onNavClick: null,
  className: '',
};

export default PickerHeader;
