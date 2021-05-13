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
  getMonthString,
  getDateString,
  getDateArray,
} from '@/utils/dayjs';
import {
  ARROW_PREV,
  ARROW_NEXT,
} from '@/utils/constants';
import pick from 'lodash.pick';
import dayjs from 'dayjs';
import PickerHeader from './picker-header';
import CalendarWeek from '../calendar/calendar-week';
import CalendarBody from '../calendar/calendar-body';

/**
 * 日期选择器
 */
class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultDate,
      value,
      range,
    } = props;

    let selectedDate = '';

    if (defaultDate) {
      selectedDate = defaultDate;
    }

    if (value) {
      selectedDate = value;
    }

    const month = getMonthString(!range ? selectedDate : selectedDate[0]);
    const defaultMonths = this.getMonthArray(month);

    this.state = {
      selectedDate,
      month,
      months: defaultMonths,
      animationTo: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      selectedDate,
      month,
    } = this.state;
    const {
      value,
    } = this.props;
    if (value !== selectedDate) {
      this.setState({
        selectedDate: value,
      }, () => {
        const diffMonth = dayjs(value).diff(month, 'month', true);
        // 不是在当前月份的情况，需要滚动到上月，或者下个月
        if (diffMonth < 0) {
          this.translateTo(ARROW_PREV);
        }
        if (diffMonth > 1) {
          this.translateTo(ARROW_NEXT);
        }
      })
    }
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
        month: prevMonth.format('YYYY-MM'),
        data: getDateArray(prevMonth)
      },
      {
        month: currMonth.format('YYYY-MM'),
        data: getDateArray(currMonth),
      },
      {
        month: nextMonth.format('YYYY-MM'),
        data: getDateArray(nextMonth),
      }
    ]
  }

  translateTo = (arrow) => {
    this.setState({
      animationTo: arrow,
    })
  }

  handleAnimationEnd = () => {
    const {
      animationTo,
      month
    } = this.state;

    if (animationTo === ARROW_PREV) {
      const prevMonth = dayjs(month).subtract(1, 'month');
      this.setState({
        animationTo: ''
      }, () => {
        this.setState({
          month: getMonthString(prevMonth),
          months: this.getMonthArray(prevMonth),
        })
      });
    }
    
    if (animationTo === ARROW_NEXT) {
      const nextMonth = dayjs(month).add(1, 'month');
      this.setState({
        animationTo: ''
      }, () => {
        this.setState({
          month: getMonthString(nextMonth),
          months: this.getMonthArray(nextMonth),
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
      value,
      onChange,
      range
    } = this.props;

    const wrapCls = classNames({
      [className]: !!className,
    }, prefixClassObject({
      calendar: true,
    }));

    return (
      <div className={wrapCls}>
        <PickerHeader
          className={prefixClass('picker-header')}
          onNavClick={this.translateTo}
          {
            ...pick(this.props, [
              'prevButton',
              'nextButton'
            ])
          }
        >
          <div 
            className={prefixClassObject({
              'calendar-headers': true,
              'to-left': animationTo === ARROW_PREV,
              'to-right': animationTo === ARROW_NEXT,
            })}
          >
            {
              months.map(m => (
                <div key={m.month} className={prefixClass('picker-calendar-header')}>
                  { m.month }
                </div>
              ))
            }
          </div>
        </PickerHeader>
        <CalendarWeek
          {
            ...pick(this.props, [
              'isoWeek',
            ])
          }
        />
        <div
          className={prefixClassObject({
            'picker-body': true,
            'to-left': animationTo === ARROW_PREV,
            'to-right': animationTo === ARROW_NEXT,
          })}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {
            months.map((m) => (
              <CalendarBody 
                className={prefixClass('picker-calendar-body')} 
                calendarData={m.data}
                key={m.month}
                {
                  ...pick(this.props, [
                    'range',
                    'showOutside',
                    'value',
                    'onChange'
                  ])
                }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  // 自定义类名
  className: PropTypes.string,
  // 默认日期
  defaultDate: dateType,
  // 是否选择范围
  range: PropTypes.bool,
  // 选择的日期
  value: PropTypes.oneOfType([
    dateType,
    PropTypes.arrayOf(dateType)
  ]),
  // 选择日期回调
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  className: null,
  onClick: null,
  range: false,
  defaultDate: dayjs(),
  onChange: null,
};

export default DatePicker;
