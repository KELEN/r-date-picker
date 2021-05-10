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

    this.state = {
      selectedDate: defaultDate,
      months: defaultMonths,
      animationTo: '',
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
    this.setState({
      animationTo: arrow,
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
      }, () => {

      });
    }

    if (arrow === 'next') {
      const date = dayjs(selectedDate).add(1, 'month');
      this.setState({
        selectedDate: date,
        months: this.getMonthArray(date)
      }, () => {

      });
    }
  }

  handleAnimationEnd = () => {
    const {
      animationTo,
      selectedDate
    } = this.state;

    if (animationTo === 'prev') {
      const date = dayjs(selectedDate).subtract(1, 'month');
      this.setState({
        animationTo: ''
      }, () => {
        this.setState({
          selectedDate: date,
          months: this.getMonthArray(date),
        })
      });
    }
    
    if (animationTo === 'next') {
      const date = dayjs(selectedDate).add(1, 'month');
      this.setState({
        animationTo: ''
      }, () => {
        this.setState({
          selectedDate: date,
          months: this.getMonthArray(date),
        })
      });
    }

  }

  render() {
    const {
      selectedDate,
      months,
      animationTo,
    } = this.state;

    const {
      className,
      onDateSelect,
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
          defaultDate={selectedDate}
        />
        <div
          className={prefixClassObject({
            'picker-body': true,
            'to-left': animationTo === 'prev',
            'to-right': animationTo === 'next',
          })}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {
            months.map((m) => (
              <CalendarBody 
                className={prefixClass('picker-calendar')} 
                calendarData={m.data}
                key={m.key}
                onDateSelect={onDateSelect}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  // 默认日期
  defaultDate: dateType,
  // 是否选择范围
  range: PropTypes.bool,
  // 选择日期回调
  onDateSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  className: null,
  onClick: null,
  range: false,
  defaultDate: dayjs(),
  onDateSelect: null,
};

export default DatePicker;