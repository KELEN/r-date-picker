import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';
import { injectIntl } from 'react-intl';
import { WEEK_DAYS } from '../../languages/en';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import MonthPicker from '../MonthPicker';
import { isMonthAfter, isMonthBefore, getFirstDayOfMonth, getLastDayOfMonth, isSameDay, isDayBefore } from '../../utils/timer';
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
      defaultValue, // default is today
      date: moment(defaultValue),
    };
  }

  componentDidMount() {
    this.resizeHandle = function () {
      if (this.container) {
        this.setState({
          containerHeight: this.container.offsetHeight,
          containerWidth: this.container.offsetWidth,
        });
      }
    }.bind(this);
    window.addEventListener('resize', this.resizeHandle);

    this.setState({
      containerHeight: this.container.offsetHeight,
      containerWidth: this.container.offsetWidth,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      minDate, maxDate,
    } = this.props;

    const {
      defaultValue,
    } = prevProps;

    if (minDate && isDayBefore(defaultValue, minDate)) {
      this.setState({
        defaultValue: minDate,
      });
    }

    if (maxDate && isMonthAfter(defaultValue, maxDate)) {
      this.setState({
        defaultValue: maxDate,
      });
    }

    if (minDate && maxDate && isSameDay(minDate, maxDate)) {
      this.setState({
        defaultValue: maxDate,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandle);
  }

  /**
   * check hide next btn
   * @param {*} defaultValue
   * @param {*} maxDate
   */
  checkIfHideNextBtn = (defaultValue, maxDate) => {
    if (!maxDate) return false;
    const nextMonth = defaultValue.clone().add(1, 'month');
    return !!(isMonthAfter(nextMonth, maxDate) || isSameDay(defaultValue, maxDate));
  }

  /**
   * check hide prev btn
   * @param {*} defaultValue
   * @param {*} minDate
   */
  checkIfHidePrevBtn = (defaultValue, minDate) => {
    if (!minDate) return false;
    const prevMonth = defaultValue.clone().subtract(1, 'month');
    return !!(isMonthBefore(prevMonth, minDate) || isSameDay(defaultValue, minDate));
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


  changeMode(mode) {
    this.setState({
      mode,
    });
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
      dateOnly,
      defaultValue,
    } = this.props;


    const hidePrevBtn = this.checkIfHidePrevBtn(defaultValue, minDate);
    const hideNextBtn = this.checkIfHideNextBtn(defaultValue, maxDate);

    const year = date.get('year');
    const month = date.get('month') + 1;

    const TitleFormat = injectIntl(({ year, month, day, intl }) => `${year}${intl.formatMessage({ id: 'year' })}${month}${intl.formatMessage({ id: 'month' })}`);

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
        >
          <span onClick={() => !dateOnly && this.changeMode('month')}>
            <TitleFormat year={year} month={month} />
          </span>
        </CalendarHeader>
        <CalendarBody
          ref={(calendarBody) => { this.calendarBody = calendarBody; }}
          {...this.props}
          labels={labelKeys}
          isAnimating={animating}
          bodyWidth={containerWidth}
          animateEnd={() => this.setState({ animating: false })}
          defaultValue={defaultValue}
          date={date}
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

Calendar.propType = {
  // visible view month
  defaultValue: PropTypes.object,
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
