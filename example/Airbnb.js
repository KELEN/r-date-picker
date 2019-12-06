import React from 'react';
import moment from 'moment';
import DateRangePicker from '../src/components/DateRangePicker';
import './Airbnb.scss';

class Airbnb extends React.Component {
  constructor() {
    super();
    this.state = {
      selectRange: [],
	    defaultDate: ['2019-03-22', '2019-04-03'],
    };
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  onDateRangeChange(range) {
    this.setState({
      selectRange: range,
    });
  }

  render() {
    const {
      selectedDate,
	    defaultDate,
    } = this.state;
    const formatArray = (arr) => {
      let str = '';

      if (arr) {
        if (arr[0]) str += arr[0].format('YYYY-MM-DD');
        else str += 'XXXX-XX-XX';
        str += ' to ';
        if (arr[1]) str += arr[1].format('YYYY-MM-DD');
        else str += 'XXXX-XX-XX';
      }

      return str;
    };

    return (
      <div>
        <h3>{ formatArray(this.state.selectedDate) }</h3>
        <b>default range is '2019-03-22' - '2019-04-03'</b>
        <DateRangePicker
          className="airbnb-example"
          renderPrevBtn={() => <svg className="navigate-btn" focusable="false" viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" /></svg>}
          renderNextBtn={() => <svg className="navigate-btn" focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" /></svg>}
          onDateRangeChange={(date) => this.setState({ selectedDate: date })}
        />
      </div>
    );
  }
}

export default Airbnb;
