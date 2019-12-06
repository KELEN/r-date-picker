import React from 'react';
import DatePicker from '../src/components/DatePicker';
import './style.scss';
import moment from 'moment';

/**
 * selectable calendar
 */
export default class SelectablePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledDates: [],
    };
    this.onDateClick = this.onDateClick.bind(this);
  }

  onDateClick(e, date) {
    this.setState(({ disabledDates }) => {
      disabledDates.push(date);
      return {
        disabledDates: disabledDates.slice(),
      };
    });
  }

  render() {
    const {
      disabledDates,
    } = this.state;
    return (
      <div>
        <h3>纯展示日历</h3>
        <DatePicker selectable={false} disabledDates={disabledDates} onDateClick={this.onDateClick} />
      </div>
    );
  }
}
