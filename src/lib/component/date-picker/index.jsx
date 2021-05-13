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
      columnWidth: null,
    };

    this.pickerContainer = React.createRef(null);
  }

  componentDidMount() {
    const {
      calendarNumber
    } = this.props;

    this.setState({
      columnWidth: this.pickerContainer.current.offsetWidth / calendarNumber
    })
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

    const {
      calendarNumber
    } = this.props;

    const prevMonth = dayjs(date).subtract(1, 'month');
    const middleMonths = [];
    for (let i = 0; i < calendarNumber; i++) {
      const month = dayjs(date).add(i, 'month');
      middleMonths.push({
        month: month.format('YYYY-MM'),
        data: getDateArray(month),
      })
    }
    const nextMonth = dayjs(date).add(calendarNumber, 'month');
    return [
      {
        month: prevMonth.format('YYYY-MM'),
        data: getDateArray(prevMonth)
      },
      ...middleMonths,
      {
        month: nextMonth.format('YYYY-MM'),
        data: getDateArray(nextMonth),
      }
    ]
  }

  translateTo = (arrow) => {
    this.setState((prevState) => {
      const {
        columnWidth
      } = prevState;
      return {
        translateX: arrow === ARROW_NEXT ? -columnWidth : columnWidth,
        animationTo: arrow,
      }
    })
  }

  handleTransitionEnd = () => {

    const {
      animationTo,
      month
    } = this.state;

    if (animationTo === ARROW_PREV) {
      const prevMonth = dayjs(month).subtract(1, 'month');
      this.setState({
        animationTo: '',
        translateX: 0,
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
        animationTo: '',
        translateX: 0,
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
      translateX,
      columnWidth,
    } = this.state;

    const {
      className,
      value,
      onChange,
      range,
      calendarNumber
    } = this.props;

    const wrapCls = classNames({
      [className]: !!className,
    }, prefixClassObject({
      calendar: true,
    }));

    const transformStyle = {
      transform: `translateX(${translateX}px)`,
      transition: `${translateX !== 0 ? 'transform 0.4s ease' : 'none'}`,
    }

    return (
      <div className={wrapCls} ref={this.pickerContainer}>
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
              // 'to-left': animationTo === ARROW_PREV,
              // 'to-right': animationTo === ARROW_NEXT,
            })}
            style={transformStyle}
          >
            {
              months.map(m => (
                <div 
                  key={m.month} 
                  style={{
                    width: columnWidth
                  }}
                  className={prefixClass('picker-calendar-header')}
                >
                  { m.month } 
                </div>
              ))
            }
          </div>
        </PickerHeader>
        <div
          className={prefixClassObject({
            'picker-week': true,
          })}
        >
          {
            months.map((m) => {
              return (
                <CalendarWeek
                  className="picker-calendar-week"
                  {
                    ...pick(this.props, [
                      'isoWeek',
                    ])
                  }
                />
              )
            })
          }
        </div>
        
        <div
          className={prefixClassObject({
            'picker-body': true,
            'to-left': animationTo === ARROW_PREV,
            'to-right': animationTo === ARROW_NEXT,
          })}
          style={transformStyle}
          onTransitionEnd={this.handleTransitionEnd}
        >
          {
            months.map((m) => (
              <CalendarBody 
                className={prefixClass('picker-calendar-body')} 
                calendarData={m.data}
                key={m.month}
                style={{
                  width: columnWidth
                }}
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
  // 日历个数
  calendarNumber: PropTypes.number,
};

DatePicker.defaultProps = {
  className: null,
  onClick: null,
  range: false,
  defaultDate: dayjs(),
  onChange: null,
  calendarNumber: 1,
};

export default DatePicker;
