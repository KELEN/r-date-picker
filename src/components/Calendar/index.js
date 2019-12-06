import React from 'react';
import PropTypes from 'prop-types';
import moment, { max, min } from 'moment';
import { CSSTransition } from 'react-transition-group';
import { WEEK_DAYS } from '../../languages/en';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import MonthPicker from '../MonthPicker';
import { isMonthAfter, isMonthBefore, getFirstDayOfMonth, getLastDayOfMonth, isSameDay, isDayBefore, isDayAfter } from '../../utils/timer';
import {
  MODE,
} from '../../utils/helper';

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultValue,
    } = props;
    this.state = {
      animating: false,
      containerHeight: 0, // height of container
      containerWidth: 0, // width of container
      date: moment(defaultValue),
    };
  }

  componentDidMount() {
    this.resizeHandle = () => {
      if (this.container) {
        this.setState({
          containerHeight: this.container.offsetHeight,
          containerWidth: this.container.offsetWidth,
        });
      }
    };
    window.addEventListener('resize', this.resizeHandle);
    this.setState({
      containerHeight: this.container.offsetHeight,
      containerWidth: this.container.offsetWidth,
    });
  }

  componentDidUpdate() {
    const {
      minDate,
      maxDate,
      defaultValue,
      onDateChange,
    } = this.props;

    if (minDate && isDayBefore(defaultValue, minDate)) {
      onDateChange(minDate);
    }

    if (maxDate && isDayAfter(defaultValue, maxDate)) {
      onDateChange(maxDate);
    }

    if (minDate && maxDate && isSameDay(minDate, maxDate)) {
      onDateChange(minDate);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandle);
  }

  /**
   * check hide next btn
   * @param {*} date
   * @param {*} maxDate
   */
  checkIfHideNextBtn = (date, maxDate) => {
    if (!maxDate) return false;
    const nextMonth = date.clone().add(1, 'month');
    return !!(isMonthAfter(nextMonth, maxDate) || isSameDay(date, maxDate));
  }

  /**
   * check hide prev btn
   * @param {*} date
   * @param {*} minDate
   */
  checkIfHidePrevBtn = (date, minDate) => {
    if (!minDate) return false;
    const prevMonth = date.clone().subtract(1, 'month');
    return !!(isMonthBefore(prevMonth, minDate) || isSameDay(date, minDate));
  }

  /**
   * prev btn click
   */
  onPrevClick = () => {
    const { minDate, onMonthChange } = this.props;
    const { date, animating } = this.state;
    if (!animating) {
      const prevMonth = moment(date).subtract(1, 'month');
      if (!isMonthAfter(getFirstDayOfMonth(minDate), getFirstDayOfMonth(prevMonth))) {
        onMonthChange && onMonthChange(prevMonth.clone());
        this.setState({
          animating: true,
          date: prevMonth,
        });
      }
    }
  }

  /**
   * next btn click
   */
  onNextClick = () => {
    const { maxDate, onMonthChange } = this.props;
    const { date, animating } = this.state;
    if (!animating) {
      const nextMonth = moment(date).add(1, 'month');
      if (!isMonthBefore(getLastDayOfMonth(maxDate), getLastDayOfMonth(nextMonth))) {
        onMonthChange && onMonthChange(nextMonth.clone());
        this.setState({
          animating: true,
          date: nextMonth,
        });
      }
    }
  }


  changeMode = () => {
    const {
      dateOnly,
    } = this.props;
    if (!dateOnly) {
      this.setState({
        mode: 'month',
      });
    }
  }

  monthChange(date) {
    this.setState({
      mode: 'date',
      defaultValue: date,
    });
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS);

    const {
      mode,
      animating,
      containerWidth,
      date,
      containerHeight,
    } = this.state;

    const {
      minDate,
      maxDate,
      renderPrevBtn,
      renderNextBtn,
      defaultValue,
      dateOnly,
    } = this.props;

    const hidePrevBtn = this.checkIfHidePrevBtn(date, minDate);
    const hideNextBtn = this.checkIfHideNextBtn(date, maxDate);

    return (
      <div
        className="rdp__container"
        ref={(container) => {
          this.container = container;
        }}
      >
        <CalendarHeader
          renderNextBtn={renderNextBtn}
          renderPrevBtn={renderPrevBtn}
          hidePrevBtn={hidePrevBtn}
          hideNextBtn={hideNextBtn}
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          date={date}
          onHeaderClick={this.changeMode}
        />
        <CalendarBody
          ref={(calendarBody) => { this.calendarBody = calendarBody; }}
          labels={labelKeys}
          isAnimating={animating}
          bodyWidth={containerWidth}
          animateEnd={() => this.setState({ animating: false })}
          date={date}
          {...this.props}
        />
        <CSSTransition
          in={mode === 'month'}
          appear
          classNames="month"
          timeout={300}
          unmountOnExit
        >
          <MonthPicker
            className="rdp__months-absolute"
            style={{
              height: containerHeight,
            }}
            defaultValue={defaultValue}
            onMonthChange={this.monthChange}
          />
        </CSSTransition>
      </div>
    );
  }
}

Calendar.propTypes = {
  // visible view month
  defaultValue: PropTypes.shape(),
  // start of range date or single date
  startDate: PropTypes.object,
  // end of range date
  endDate: PropTypes.object,
  // min month limit
  minDate: PropTypes.object,
  // min month limit
  maxDate: PropTypes.object,
  // month change event
  onMonthChange: PropTypes.func,
  // date select only, without month select
  dateOnly: PropTypes.bool,
  mode: PropTypes.string,
  // 是否选择范围，默认否
  range: PropTypes.bool,
};

Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  defaultValue: moment(),
  dateOnly: true,
  // 默认是选择日期
  mode: MODE.DATE,
  range: false,
};


export default Calendar;
