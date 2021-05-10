import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  dateType,
} from '@/utils/prop-types';
import {
  prefixClassObject,
  prefixClass,
} from '@/utils/style';
import {
  getDateString,
  getDateArray,
} from '@/utils/dayjs';
import pick from 'lodash.pick';
import dayjs from 'dayjs';
import { CSSTransition } from 'react-transition-group';
import PickerHeader from './picker-header';
import CalendarBody from '../calendar/calendar-body';

/**
 * 日期选择器
 */
class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultDate,
    } = props;
    const defaultMonths = this.getMonthArray(defaultDate);

    this.bodyRef = React.createRef(null);

    this.state = {
      selectedDate: defaultDate,
      months: defaultMonths,
      startAnimation: false,
      animationCls: '',
    };
  }

  /**
   * 获取每个日历需要渲染的数据
   */
  getMonthArray = (date) => {
    const prevMonth = dayjs(date).subtract(1, 'month');
    const currMonth = dayjs(date);
    const nextMonth = dayjs(date).add(1, 'month');
    return [
      {
        key: prevMonth.format('YYYY-MM'),
        data: getDateArray(prevMonth)
      },
      {
        key: currMonth.format('YYYY-MM'),
        data: getDateArray(currMonth),
      },
      {
        key: nextMonth.format('YYYY-MM'),
        data: getDateArray(nextMonth),
      }
    ]
  }

  translateTo = (arrow) => {
    console.log(prefixClass(arrow === 'next' ? 'to-right' : 'to-left'))
    this.setState({
      startAnimation: true,
      animationCls: prefixClass(arrow === 'next' ? 'to-right' : 'to-left'),
    })
  }

  handleNavClick = (arrow) => {
    const {
      selectedDate,
    } = this.state;

    if (arrow === 'prev') {
      const date = dayjs(selectedDate).subtract(1, 'month');
      this.setState({
        selectedDate: date,
        months: this.getMonthArray(date)
      });
    }

    if (arrow === 'next') {
      const date = dayjs(selectedDate).add(1, 'month');
      this.setState({
        selectedDate: date,
        months: this.getMonthArray(date)
      });
    }
  }

  handleTransitionEnd = () => {
    console.log(1);
    this.setState({
      startAnimation: false,
      animationCls: ''
    })
  }

  render() {
    const {
      selectedDate,
      months,
      startAnimation,
      animationCls,
    } = this.state;

    const {
      className,
    } = this.props;

    const wrapCls = classNames({
      [className]: !!className,
    }, prefixClassObject({
      calendar: true,
    }));

    return (
      <div className={wrapCls}>
        <PickerHeader
          onNavClick={this.translateTo}
          date={selectedDate}
        />
        <CSSTransition 
          in={startAnimation} timeout={200} classNames={animationCls}
          onExited={this.handleTransitionEnd}
          onEntered={this.handleTransitionEnd}
        >
          <div
            className={prefixClass('picker-body')}
          >
            {
              months.map((m) => {
                return <CalendarBody className={prefixClass('picker-calendar')} calendarData={m.data} key={m.key} />
              })
            }
          </div>
        </CSSTransition>
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  defaultDate: dateType,
  onClick: PropTypes.func,
  range: PropTypes.bool,
};

DatePicker.defaultProps = {
  className: null,
  onClick: null,
  range: false,
  defaultDate: dayjs(),
};

export default DatePicker;
