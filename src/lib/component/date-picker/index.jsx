import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  dateType,
} from '@/utils/prop-types';
import {
  prefixClassObject,
} from '@/utils/style';
import {
  getMonthString,
  getDateArray,
} from '@/utils/dayjs';
import {
  ARROW_PREV,
  ARROW_NEXT,
} from '@/utils/constants';
import pick from 'lodash.pick';
import dayjs from 'dayjs';
import usePickerAction from '@/hooks/usePickerAction';
import PickerHeader from './picker-header';
import CalendarWeek from '../calendar/calendar-week';
import PickerBody from './picker-body';

const DatePicker = (props) => {
  const {
    defaultDate,
    value,
    range,
    calendarNumber,
    className,
    showOutside,
    onChange,
    min,
    max,
    selectable,
  } = props;

  let initSelectedDate = '';

  if (defaultDate) {
    initSelectedDate = defaultDate;
  }

  if (value) {
    initSelectedDate = value;
  }

  /**
   * 获取每个日历需要渲染的数据
   */
  const getMonthArray = (date) => {
    const prevMonth = dayjs(date).subtract(1, 'month');
    const middleMonths = [];
    for (let i = 0; i < calendarNumber; i += 1) {
      const month = dayjs(date).add(i, 'month');
      middleMonths.push({
        month: month.format('YYYY-MM'),
        data: getDateArray(month, { min, max }),
      });
    }
    const nextMonth = dayjs(date).add(calendarNumber, 'month');
    return [
      {
        month: prevMonth.format('YYYY-MM'),
        data: getDateArray(prevMonth, { min, max }),
      },
      ...middleMonths,
      {
        month: nextMonth.format('YYYY-MM'),
        data: getDateArray(nextMonth, { min, max }),
      },
    ];
  };

  const initMonth = getMonthString(!range ? initSelectedDate : initSelectedDate[0]);
  const defaultMonths = getMonthArray(initMonth);

  const [selectedDate, setSelectedDate] = useState(initSelectedDate);
  const [month, setMonth] = useState(initMonth);
  const [months, setMonths] = useState(defaultMonths);
  const [columnWidth, setColumnWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animateTo, setAnimateTo] = useState('');

  const pickerContainerRef = useRef(null);

  const translateTo = (arrow) => {
    setTranslateX(arrow === ARROW_NEXT ? -columnWidth : columnWidth);
    setAnimateTo(arrow);
  };

  useEffect(() => {
    setColumnWidth(pickerContainerRef.current.offsetWidth / calendarNumber);
  }, []);

  useEffect(() => {
    if (value !== selectedDate) {
      setSelectedDate({
        selectedDate: value,
      });
      const diffMonth = dayjs(value).diff(month, 'month', true);
      // 不是在当前月份的情况，需要滚动到上月，或者下个月
      if (diffMonth < 0) {
        translateTo(ARROW_PREV);
      }
      if (diffMonth > calendarNumber) {
        translateTo(ARROW_NEXT);
      }
    }
  }, [value]);

  const handleTransitionEnd = () => {
    if (animateTo === ARROW_PREV) {
      const prevMonth = dayjs(month).subtract(1, 'month');

      setAnimateTo('');
      setTranslateX(0);
      setMonth(getMonthString(prevMonth));
      setMonths(getMonthArray(prevMonth));
    }

    if (animateTo === ARROW_NEXT) {
      const nextMonth = dayjs(month).add(1, 'month');
      setAnimateTo('');
      setTranslateX(0);
      setMonth(getMonthString(nextMonth));
      setMonths(getMonthArray(nextMonth));
    }
  };

  const wrapCls = classNames({
    [className]: !!className,
  }, prefixClassObject({
    calendar: true,
  }));

  const transformStyle = {
    transform: `translateX(${translateX}px)`,
    transition: `${translateX !== 0 ? 'transform 0.4s ease' : 'none'}`,
  };

  const {
    months: newMonths,
    onDateEnter,
    onDateLeave,
    onDateClick,
  } = usePickerAction({
    months,
    onChange,
    value,
    range,
    showOutside,
    selectable,
  });

  return (
    <div className={wrapCls} ref={pickerContainerRef}>
      <PickerHeader
        className={prefixClassObject({
          'picker-header': true,
        })}
        onNavClick={translateTo}
        {
          ...pick(props, [
            'prevButton',
            'nextButton',
          ])
        }
      >
        <div
          className={prefixClassObject({
            'calendar-headers': true,
          })}
          style={transformStyle}
        >
          {
            newMonths.map((m) => (
              <div
                key={m.month}
                style={{
                  width: columnWidth,
                }}
                className={prefixClassObject({
                  'picker-calendar-column': 1,
                })}
              >
                <div
                  className={prefixClassObject({
                    'picker-calendar-header': true,
                  })}
                >
                  { m.month }
                </div>
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
          newMonths.map((m) => (
            <div
              key={m.month}
              style={{
                width: columnWidth,
              }}
              className={prefixClassObject({
                'picker-calendar-column': 1,
              })}
            >
              <CalendarWeek
                className={prefixClassObject({
                  'picker-calendar-week': true,
                })}
                {
                  ...pick(props, [
                    'isoWeek',
                  ])
                }
              />
            </div>
          ))
        }
      </div>
      <div
        className={prefixClassObject({
          'picker-body': true,
          'to-left': animateTo === ARROW_PREV,
          'to-right': animateTo === ARROW_NEXT,
        })}
        style={transformStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {
          newMonths.map((m) => (
            <div
              key={m.month}
              style={{
                width: columnWidth,
              }}
              className={prefixClassObject({
                'picker-calendar-column': 1,
              })}
            >
              <PickerBody
                className={prefixClassObject({
                  'picker-calendar-body': true,
                })}
                calendarData={m.data}
                onDateEnter={onDateEnter}
                onDateLeave={onDateLeave}
                onDateClick={onDateClick}
                {
                  ...pick(props, [
                    'range',
                    'showOutside',
                    'value',
                    'onChange',
                    'itemRender',
                  ])
                }
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

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
    PropTypes.arrayOf(dateType),
  ]),
  // 最小日期
  min: dateType,
  // 最大日期
  max: dateType,
  // 选择日期回调
  onChange: PropTypes.func,
  // 日历个数
  calendarNumber: PropTypes.number,
  // 是否展示当前日历之外的日期
  showOutside: PropTypes.bool,
  // 是否可选
  selectable: PropTypes.bool,
};

DatePicker.defaultProps = {
  className: null,
  range: false,
  value: null,
  defaultDate: dayjs(),
  onChange: null,
  calendarNumber: 1,
  showOutside: true,
  min: null,
  max: null,
  selectable: true,
};

export default DatePicker;
