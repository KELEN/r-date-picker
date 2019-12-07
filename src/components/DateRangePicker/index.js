import React from 'react';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classname';
import Calendar from '../Calendar';
import EnhanceCalendar from '../Calendar/EnhanceCalendar';
import EnhanceIntlProvider from '../EnhanceIntlProvider';

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftMaxDate: moment().endOf('month'),
      rightMinDate: moment().add(1, 'month').startOf('month'),
      startMonth: moment(),
      endMonth: moment().add(1, 'month'),
    };
  }

  onStartMonthChange = (date) => {
    this.setState({
      startMonth: date,
      rightMinDate: date.clone().add(1, 'month').startOf('month'),
    });
  }

  onEndMonthChange = (date) => {
    this.setState({
      endMonth: date,
      leftMaxDate: date.clone().subtract(1, 'month').endOf('month'),
    });
  }

  render() {
    const {
      startMonth,
      endMonth,
      leftMaxDate,
      rightMinDate,
    } = this.state;

    const {
      startDate,
      endDate,
      hoveringDate,
      minDate,
      maxDate,
      className,
      single, // single calendar
    } = this.props;

    const cls = classNames({
      [className]: !!className,
      'rdp-range__container': true,
    });

    const rightMin = rightMinDate || (moment.min(maxDate, rightMinDate) || minDate);
    const leftMax = leftMaxDate || moment.min(maxDate, leftMaxDate) || minDate.clone().endOf('month');

    return (
      <>
        { !single
          ? (
            <div className={cls}>
              <div className="rdp-range__calendar rdp-range__left">
                <Calendar
                  {...this.props}
                  range
                  minDate={minDate}
                  maxDate={leftMax}
                  startDate={startDate || hoveringDate}
                  endDate={endDate || hoveringDate}
                  defaultValue={startMonth}
                  onMonthChange={this.onStartMonthChange}
                />
              </div>
              <div className="rdp-range__calendar rdp-range__right">
                <Calendar
                  {...this.props}
                  range
                  minDate={rightMin}
                  startDate={startDate || hoveringDate}
                  endDate={endDate || hoveringDate}
                  defaultValue={endMonth}
                  onMonthChange={this.onEndMonthChange}
                />
              </div>
            </div>
          )
          : (
            <div className={cls}>
              <Calendar
                {...this.props}
                range
                startDate={startDate || hoveringDate}
                endDate={endDate || hoveringDate}
                defaultValue={startMonth}
                onMonthChange={this.onEndMonthChange}
              />
            </div>
          )}
      </>
    );
  }
}

DateRangePicker.propTypes = {
  defaultDate: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(moment), PropTypes.string])),
  ]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
  single: PropTypes.bool,
};

DateRangePicker.defaultProps = {
  defaultValue: [],
  defaultDate: null,
  minDate: null,
  maxDate: null,
  // 显示一个日历
  single: false,
};

export default EnhanceIntlProvider(EnhanceCalendar(DateRangePicker, { range: true }));
