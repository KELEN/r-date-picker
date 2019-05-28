import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

/**
 * render calendar labels
 * @param {*} props 
 */
const CalendarLabel = (props) => {
  const { labels } = props
  return (
    <div className="rdp__labels">
      {
        labels.map((item, idx) => {
          return (
            <div className="rdp__labels-item" key={idx}>
              <FormattedMessage id={item} />
            </div>
          )
        })
      }
    </div>
  )
}

CalendarLabel.propTypes = {
  labels: PropTypes.array
}

export default CalendarLabel
