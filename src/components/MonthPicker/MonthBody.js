import React from 'react'
import className from 'classname'
import PropTypes from 'prop-types'
import { noop } from '../../utils/helper'

const months = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]

class MonthBody extends React.Component {

  render() {
    const {
      month,
      minDate,
      onMonthClick,
    } = this.props

    const MonthRow = (props) => {
      const nums = props.nums
      return (
        <div className="rdp__months-row">
          {
            nums.map(num => {
              const monthItemCls = className({
                'rdp__months-item': true,
                'rdp__months-item-active': Number(month) === Number(num)
              })
              return (
                <div key={num} className={ monthItemCls } onClick={() => onMonthClick(num) }>
                  { num }
                </div>
              )
            })
          }
        </div>
      )
    }
    return (
      <div className="rdp__months-body">
        {
          months.map((nums, idx) => <MonthRow key={idx} nums={ nums } /> )
        }
      </div>
    )
  }
}

MonthBody.propTypes = {
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onMonthClick: PropTypes.func
}

MonthBody.defaultProps = {
  onMonthClick: noop
}

export default MonthBody;