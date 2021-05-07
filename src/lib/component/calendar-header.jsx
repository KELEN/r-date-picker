import React from 'react'
import PropTypes from 'prop-types'

const CalendarHeader = React.memo((props) => {
  const {
    children,
  } = props;
  return (
    <div>
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
