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

const PickerHeader = React.memo((props) => {
  const {
    defaultDate,
    onNavClick,
  } = props;

  return (
    <div className={prefixClass('calendar-header')}>
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-prev': true,
        })}
        onClick={() => {
          onNavClick('prev');
        }}
      >
        prev
      </span>
      { getMonthString(defaultDate) }
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-next': true,
        })}
        onClick={() => {
          onNavClick('next');
        }}
      >
        next
      </span>
    </div>
  );
});

PickerHeader.propTypes = {
  onNavClick: PropTypes.func,
  defaultDate: dateType,
};

PickerHeader.defaultProps = {
  onNavClick: null,
  defaultDate: dayjs(),
};

export default PickerHeader;
