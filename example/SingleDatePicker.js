import React from 'react';
import moment from 'moment';
import DatePicker from '../src/components/DatePicker';
import './style.scss';

const defaultMinDate = moment().subtract(4, 'days').format('YYYY-MM-DD');
const defaultMaxDate = moment().add(3, 'days').format('YYYY-MM-DD');
const disabledDatesRange = [moment().subtract(10, 'days').format('YYYY-MM-DD'), moment().add(5, 'days').format('YYYY-MM-DD')];

export default class SimpleDatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: moment(),
      minDate: null,
      maxDate: null,
      disabledDates: [],
    };
  }

  resetLimit = () => {
    this.setState({
      minDate: null,
      maxDate: null,
      disabledDates: [],
    });
  }

  setMinDate = () => {
    this.setState({
      minDate: defaultMinDate,
    });
  }

  setMaxDate = () => {
    this.setState({
      maxDate: defaultMaxDate,
    });
  }

  setLimit = () => {
    this.setState({
      disabledDates: disabledDatesRange,
    });
  }

  render() {
    const {
      selectedDate,
      minDate,
      maxDate,
      disabledDates,
    } = this.state;
    return (
      <div>
        <h3>
          选中的日期:
          { selectedDate.format('YYYY-MM-DD') }
        </h3>
        <div className="op-bar">
          <button onClick={this.setMinDate}>
            设置最小日期为
            {defaultMinDate}
          </button>
          <button onClick={this.setMaxDate}>
            设置最大日期为
            {defaultMaxDate}
          </button>
          <button onClick={this.setLimit}>
            禁止选择
            {disabledDatesRange.join(', ')}
          </button>
          <button onClick={this.resetLimit}>取消限制</button>
        </div>
        <div className="fl">
          <h3 className="text-center">normal datepicker</h3>
          <DatePicker
            minDate={minDate && moment(minDate)}
            maxDate={maxDate && moment(maxDate)}
            disabledDates={disabledDates}
            defaultValue={selectedDate}
            onDateChange={(event, date) => this.setState({ selectedDate: date })}
          />
        </div>
        {/* <div className="fl">
          <h3 className="text-center">disable select month</h3>
          <DatePicker
            minDate={minDate && moment(minDate)}
            maxDate={maxDate && moment(maxDate)}
            disabledDates={disabledDates}
            defaultDate={selectedDate}
            dateOnly
            onDateChange={(event, date) => this.setState({ selectedDate: date })}
          />
        </div> */}
      </div>
    );
  }
}
