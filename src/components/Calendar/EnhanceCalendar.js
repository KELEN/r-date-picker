import React from 'react';
import PropTypes from 'prop-types';

/**
 * EnhanceCalendar
 * 处理选择的日期
 * @param WrapComponent
 * @param options  range: 是否选择时间范围
 * @constructor
 */
const EnhanceCalendar = (WrapComponent, options = {}) => {
  const { range = false } = options;

  class MComponent extends React.Component {
    constructor(props) {
      super(props);
      let startDate;
      let endDate;
      const { defaultDate } = props;
      if (range && Array.isArray(defaultDate)) {
        // 时间范围
        [startDate, endDate] = defaultDate;
      } else {
        startDate = defaultDate;
      }
      this.state = {
        animating: false,
        startDate,
        endDate,
        hoveringDate: null,
      };
    }

    /**
     * hovering day item
     * @param {*} event
     * @param {*} date
     */
    onHoveringDateChange = (date) => {
      const { startDate, endDate, isHovering } = this.state;
      const { onHoveringDateChange } = this.props;
      if (range && isHovering) {
        this.setState({
          hoveringDate: date,
        });
        if (startDate && startDate.isAfter(date)) {
          this.setState({
            startDate: null,
            endDate: startDate,
          });
        } else if (endDate && endDate.isBefore(date)) {
          this.setState({
            startDate: endDate,
            endDate: null,
          });
        }
      }
      if (typeof onHoveringDateChange === 'function') {
        onHoveringDateChange(date);
      }
    }

    /**
     * date change
     * @param {*} event
     * @param {*} date
     */
    onDateChange= (date) => {
      const { startDate, endDate } = this.state;
      const { onDateChange, onDateRangeChange } = this.props;
      if (range) {
        if (!startDate && !endDate) {
          this.setState({
            startDate: date,
            isHovering: true,
          });
        } else if (!startDate) {
          this.setState({
            startDate: date,
            isHovering: !endDate,
          });

          if (typeof onDateChange === 'function') {
            onDateRangeChange([date, endDate]);
          }
        } else if (!endDate) {
          if (date.isBefore(startDate)) {
            this.setState({
              startDate: date,
              endDate: startDate,
              isHovering: !startDate,
            });
            if (typeof onDateRangeChange === 'function') {
              onDateRangeChange([date, startDate]);
            }
          } else {
            this.setState({
              endDate: date,
              isHovering: !startDate,
            });
            if (typeof onDateRangeChange === 'function') {
              onDateRangeChange([startDate, date]);
            }
          }
        } else {
          this.setState({
            startDate: date,
            endDate: null,
            isHovering: true,
            hoveringDate: null,
          });
        }
      } else {
        this.setState({
          startDate: date,
        });
      }
      if (typeof onDateChange === 'function') {
        onDateChange(date);
      }
    }

    render() {
      return (
        <WrapComponent
          onDateChange={this.onDateChange}
          onHoveringDateChange={this.onHoveringDateChange}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  MComponent.propTypes = {
    defaultDate: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf()]),
    onHoveringDateChange: PropTypes.func,
    onDateChange: PropTypes.func,
    onDateRangeChange: PropTypes.func,
  };

  return MComponent;
};

export default EnhanceCalendar;
