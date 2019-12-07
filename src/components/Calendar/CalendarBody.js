import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classname';
import { FormattedMessage } from 'react-intl';
import { isSameDay, isDayBefore, isDayAfter, dateDisabled, checkInRange } from '../../utils/timer';
import { WEEK_DAYS } from '../../languages/en';

const labelKeys = Object.keys(WEEK_DAYS);

class CalendarBody extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      ranges,
      defaultValue,
    } = props;

    this.state = {
      allDays: this.getAllDays(props.defaultValue),
      moveNext: false,
      movePrev: false,
    };

    if (ranges) {
      this.checkInRange = checkInRange(ranges);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      date: prevDate,
    } = prevProps;
    const {
      date,
    } = this.props;
    this.updateStateIfNeed(date, prevDate);
  }

  /**
   * 动画切换和重新渲染calendar body
   * */
  updateStateIfNeed = (date, prevDate) => {
    if (!isSameDay(date, prevDate)) {
      if (isDayBefore(date, prevDate)) {
        // prev
        this.setState({
          movePrev: true,
          moveNext: false,
        });
      }
      if (isDayAfter(date, prevDate)) {
        // next
        this.setState({
          movePrev: false,
          moveNext: true,
        });
      }

      if (!this.isAnimating) {
        this.setState({
          allDays: this.getAllDays(prevDate),
        });
      }
    }
  }

  getMonthDays = (startOfMonth) => {
    const daysInMonth = startOfMonth.daysInMonth(); // total num in month
    const startNum = startOfMonth.weekday(); // the first weekday
    const nextMonth = startOfMonth.clone().add(1, 'month');
    const prevMonthDays = this.renderPrevMonthDays(startOfMonth, startNum);
    const currMonthDays = this.renderCurrMonthDays(startOfMonth, daysInMonth);
    const nextMonthDays = this.renderNextMonthDays(nextMonth.startOf('month'), 42 - prevMonthDays.length - currMonthDays.length);
    return {
      [startOfMonth.format('YYYYMMDD')]: [
        ...prevMonthDays,
        ...currMonthDays,
        ...nextMonthDays,
      ],
    };
  }

  /**
   * render last month
   */
  renderPrevMonthDays = (firstDay, count) => {
    const emptyDays = [];
    let start = moment(firstDay).clone().subtract(count, 'days');
    const i = -1;
    while (count--) {
      emptyDays.push(
        {
          num: start.format('D'),
          date: null,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true,
        },
      );
      start = moment(firstDay).clone().subtract(count, 'days');
    }
    return emptyDays;
  }

  /**
   * render current month
   */
  renderCurrMonthDays = (firstDay, count) => {
    const realDays = [];
    let i = 1;
    while (count--) {
      const date = moment(firstDay).clone().add(i - 1, 'days');
      realDays.push(
        {
          num: i,
          active: false,
          date,
          connect: false,
          isStart: false,
          isEnd: false,
          isDisable: false,
          key: date.format('YYYYMMDD'),
          inMonth: true,
        },
      );
      i++;
    }
    return realDays;
  }

  /**
   * render next month empty days
   * @param {*} start
   * @param {*} count
   */
  renderNextMonthDays = (start, count) => {
    const emptyDays = [];
    let i = 1;
    while (count--) {
      emptyDays.push(
        {
          num: start.format('D'),
          date: null,
          start,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true,
        },
      );
      start = moment(start).clone().add(1, 'd');
      i += 1;
    }
    return emptyDays;
  }

  getAllDays = (currDate) => {
    const currMonth = moment(currDate).startOf('month');
    const prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'));
    const currMonthDays = this.getMonthDays(currMonth);
    const nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'));
    return [prevMonthDays, currMonthDays, nextMonthDays];
  }


  handleClick = (date) => {
    const {
      onDateClick,
    } = this.props;
    onDateClick && onDateClick(date);
  }

  handleMouseDown = (date) => {
    const {
      onDateChange,
    } = this.props;
    onDateChange && onDateChange(date);
  }

  handleMouseEnter = (date) => {
    const { onHoveringDateChange } = this.props;
    onHoveringDateChange && onHoveringDateChange(date);
  }

  transitionEndHandle = (e) => {
    if (e.propertyName == 'transform') {
      const { movePrev, moveNext } = this.state;
      const { date, animateEnd } = this.props;
      const allDays = this.getAllDays(date);
      const currAllDays = this.state.allDays;

      if (movePrev) {
        // prev
        currAllDays.pop();
        currAllDays.unshift(allDays.shift());

        this.setState({
          movePrev: false,
          moveNext: false,
          allDays: currAllDays,
        }, () => {
          animateEnd();
        });
      }

      if (moveNext) {
        // next
        currAllDays.shift();
        currAllDays.push(allDays.pop());

        this.setState({
          movePrev: false,
          moveNext: false,
          allDays: currAllDays,
        }, () => {
          animateEnd();
        });
      }
    }
  }

  render() {
    const {
      allDays,
      movePrev,
      moveNext,
    } = this.state;

    const {
      startDate,
      endDate,
      defaultValue,
      isAnimating,
      range,
      itemRender,
      minDate,
      maxDate,
      disabledDates,
      selectable,
      bodyWidth,
      itemClass,
      labels,
      mode,
    } = this.props;

    const renderRowDays = (days) => days.map((item) => {
      const typeOfItemClass = typeof itemClass;
      let itemClassStr = '';
      if (typeOfItemClass === 'function') {
        itemClassStr = itemClass(item) || '';
      }
      if (typeOfItemClass === 'string') {
        itemClassStr = itemClass;
      }
      const commonCls = classNames({
        'rdp__days-item--grey': item.isDisable,
        'rdp__days-item--empty': !item.inMonth,
        'rdp__days-item': true,
        [itemClassStr]: !!itemClassStr,
      });

      let alternativeCls = '';
      if (range) {
        alternativeCls = classNames({
          'rdb__days-item-active--connect': item.connect,
          'rdp__days-item-active--start': item.isStart && selectable,
          'rdp__days-item-active--end': item.isEnd,
          'rdp__days-item-active--single': !endDate && item.isStart && !range && selectable,
          'rdp__days-item-active--range-start': item.isRangeStart || item.isRangeAdjacent,
          'rdp__days-item-active--range-end': item.isRangeEnd || item.isRangeAdjacent,
          'rdp__days-item-active--range-connect': item.isInRange && (!item.isRangeStart && !item.isRangeEnd),
        });
      } else {
        alternativeCls = classNames({
          'rdp__days-item-active--single': item.active,
        });
      }

      const allowDownEvent = !item.isDisable && item.inMonth && selectable;
      const allowHoverEvent = range && item.inMonth && !item.isDisable;

      return (
        <div
          className={`${commonCls} ${alternativeCls}`}
          key={item.key}
          data-label={item.dayStr}
          data-key={item.key}
          onClick={() => this.handleClick(item.date)}
          onMouseDown={() => allowDownEvent && this.handleMouseDown(item.date)}
          onMouseEnter={() => allowHoverEvent && this.handleMouseEnter(item.date)}
        >
          { itemRender ? itemRender(item) : item.num }
        </div>
      );
    });

    const renderDays = (days) => {
      const rowArray = [];
      let arr = [];
      days.forEach((item, idx) => {
        if (item.date) { // only handle item has date
          if (this.checkInRange) {
            const checkRangeRet = this.checkInRange(item.date);
            item.isRangeStart = checkRangeRet.isRangeStart;
            item.isInRange = checkRangeRet.isInRange;
            item.isRangeEnd = checkRangeRet.isRangeEnd;
            item.isRangeAdjacent = checkRangeRet.isRangeAdjacent;
          }
          item.isDisable = isDayBefore(item.date, minDate) || isDayAfter(item.date, maxDate) || dateDisabled(disabledDates, item.date);
          if (range) {
            if (startDate && endDate) {
              item.isStart = isSameDay(startDate, item.date);
              item.isEnd = isSameDay(endDate, item.date);
              item.active = isSameDay(startDate, item.date) || isSameDay(endDate, item.date);
              item.connect = isDayAfter(item.date, startDate) && isDayBefore(item.date, endDate);
            } else {
              item.isStart = isSameDay(startDate, item.date);
              item.active = isSameDay(startDate, item.date);
              item.isEnd = isSameDay(endDate, item.date);
              item.connect = false;
            }
          } else {
            item.active = isSameDay(defaultValue, item.date);
          }
        } else {
          item.active = false;
        }
        if (idx > 0 && idx % 7 === 0) {
          // new row
          rowArray.push(arr);
          arr = [];
        }
        arr.push(item);
      });

      // last row
      if (arr.length) {
        rowArray.push(arr);
      }
      return rowArray.map((rowDays, idx) => (
        <div className="rdp__days-row" key={idx}>
          { renderRowDays(rowDays) }
        </div>
      ));
    };

    const renderAllDays = () => allDays.map((pageDays, idx) => {
      // base on key format is { YYYYMMDD }
      const key = Object.keys(pageDays)[0];
      const cls = classNames({
        rdp__view: true,
        'rdp--hidden': !isAnimating && idx !== 1, // the middle is visible
      });
      return (
        <div className={cls} key={key}>
          { renderDays(pageDays[key]) }
        </div>
      );
    });

    const cls = classNames({
      'rdp__animation-left': isAnimating && moveNext,
      'rdp__animation-right': isAnimating && movePrev,
      rdp__body: true,
    });

    let translateX = 0;
    if (movePrev) {
      translateX = bodyWidth;
    }
    if (moveNext) {
      translateX = -bodyWidth;
    }

    const bodyStyle = {
      width: bodyWidth * 3,
      left: -bodyWidth,
      transform: isAnimating && `translateX(${translateX}px)`,
    };

    return (
      <>
        <div className="rdp__labels">
          {
            labelKeys.map((item, idx) => (
              <div className="rdp__labels-item" key={item}>
                <FormattedMessage id={item} />
              </div>
            ))
          }
        </div>
        <div className={cls} style={bodyStyle} onTransitionEnd={this.transitionEndHandle}>
          { renderAllDays(allDays) }
        </div>
      </>
    );
  }
}

const propTypes = {
  minDate: PropTypes.shape(),
  maxDate: PropTypes.shape(),
  disabledDates: PropTypes.array,
  defaultValue: PropTypes.shape(),
  onHoveringDateChange: PropTypes.func,
  onDateChange: PropTypes.func, // date change event
  isAnimating: PropTypes.bool.isRequired, // if body is animating
  onDateRangeChange: PropTypes.func, // day range change event
  range: PropTypes.bool, // select day range
  itemRender: PropTypes.func, // day item render function
  selectable: PropTypes.bool, // if selectable
  onDateClick: PropTypes.func, // date click event
  itemClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  date: PropTypes.shape(),
};

const defaultProps = {
  isAnimating: false,
  selectable: true,
  disabledDates: [],
  itemClass: '',
  range: false, // select range date
};

CalendarBody.propTypes = propTypes;
CalendarBody.defaultProps = defaultProps;

export default CalendarBody;
