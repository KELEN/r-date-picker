import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

class CalendarLabel extends React.Component {

  static propTypes = {
    labels: PropTypes.array
  }

  constructor(props) {
    super(props)
  }

  renderLabel(labels) {
    return labels.map((item, idx) => {
      return (
        <div className="rdp__labels-item" key={idx}>
          <FormattedMessage id={item} />
        </div>
      )
    })
  }

  render() {
    const { labels } = this.props
    return (
      <div className="rdp__labels ">
        { this.renderLabel(labels) }
      </div>
    )
  }
}

export default CalendarLabel