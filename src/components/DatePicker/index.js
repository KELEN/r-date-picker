import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classname';
import Calendar from '../Calendar';
import EnhanceCalendar from '../Calendar/EnhanceCalendar';
import EnhanceIntlProvider from '../EnhanceIntlProvider';

const DatePicker = (props) => {
  const {
    startDate,
    endDate,
    hoveringDate,
    className,
  } = props;
  const cls = classNames({
    [className]: !!className,
    'rdp-datepicker-container': true,
  });
  return (
    <div className={cls}>
      <Calendar
        startDate={startDate || hoveringDate}
        endDate={endDate || hoveringDate}
        {...props}
      />
    </div>
  );
};

DatePicker.propTypes = {
  // default selected dates
  defaultDate: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
  // init visible current month, default is current month
  defaultValue: PropTypes.shape(),
  // set range
  ranges: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]))),
};

DatePicker.defaultProps = {
  defaultValue: moment(),
  defaultDate: null,
  ranges: [],
};

export default EnhanceIntlProvider(EnhanceCalendar(DatePicker));
