import React from 'react';
import PropTypes from 'prop-types';
import {
  prefixClass
} from '../utils/style'

const CalendarHeader = React.memo((props) => {
  const {
    children,
  } = props;
  
  return (
    <div className={prefixClass('calendar-header')}>
      { children }
    </div>
  )
})

CalendarHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
}

export default CalendarHeader
