import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarHeader from '../Calendar/CalendarHeader';
import MonthBody from './MonthBody';
import { noop } from '../../utils/helper';
import EnhanceIntlProvider from '../EnhanceIntlProvider';

/**
 * month picker
 */
class MonthPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.defaultValue,
    };
  }

  onPrevClick = () => {
    const {
      date,
    } = this.state;
    this.setState({
      date: date.subtract(1, 'year'),
    });
  }

  onNextClick = () => {
    const {
      date,
    } = this.state;
    this.setState({
      date: date.add(1, 'year'),
    });
  }

  onMonthClick = (num) => {
    const {
      onMonthChange,
      defaultValue,
    } = this.props;
    const {
      date,
    } = this.state;
    const newDate = moment({
      y: date.format('YYYY'),
      M: num - 1,
      d: defaultValue.format('D'),
    });

    this.setState({
      date: newDate,
    });

    onMonthChange(newDate);
  }

  render() {
    const {
      date,
    } = this.state;

    const {
      className,
      style,
    } = this.props;

    const cls = `rdp__month-container ${className}`;

    return (
      <div className={cls} style={style}>
        <CalendarHeader
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          date={date}
        />
        <MonthBody
          onMonthClick={this.onMonthClick}
          month={date.format('M')}
          defaultValue={moment()}
        />
      </div>
    );
  }
}

MonthPicker.propTypes = {
  defaultValue: PropTypes.shape(),
  style: PropTypes.shape(),
  onMonthChange: PropTypes.func,
  className: PropTypes.string,
};

MonthPicker.defaultProps = {
  defaultValue: moment(),
  style: {},
  onMonthChange: noop,
  className: '',
};

export default EnhanceIntlProvider(MonthPicker);
