import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
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
    isoWeek,
  } = props;

  const initMonth = getMonthString(!range ? value : value?.[0]);

  const [selectedDate, setSelectedDate] = useState(value);
  const [month, setMonth] = useState(initMonth);
  const [columnWidth, setColumnWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animateTo, setAnimateTo] = useState('');
  // 鼠标hover的日期
  const [hoveringDate, setHoveringDate] = useState(null);

  const pickerContainerRef = useRef(null);

  const translateTo = (arrow) => {
    setTranslateX(arrow === ARROW_NEXT ? -columnWidth : columnWidth);
    setAnimateTo(arrow);
  };

  useEffect(() => {
    setColumnWidth(pickerContainerRef.current.offsetWidth / calendarNumber);
  }, []);

  const handleTransitionEnd = () => {
    if (animateTo === ARROW_PREV) {
      const prevMonth = dayjs(month).subtract(1, 'month');
      setAnimateTo('');
      setTranslateX(0);
      setMonth(getMonthString(prevMonth));
    }

    if (animateTo === ARROW_NEXT) {
      const nextMonth = dayjs(month).add(1, 'month');
      setAnimateTo('');
      setTranslateX(0);
      setMonth(getMonthString(nextMonth));
    }
  };

  const wrapCls = classNames({
    [className]: !!className,
  }, prefixClassObject({
    calendar: true,
  }));

  const transformStyle = {
    transform: `translateX(${translateX}px)`,
    transition: `${translateX !== 0 ? 'transform 0.4s ease-in-out' : 'none'}`,
  };

   /**
   * 获取每个日历需要渲染的数据
   */
  const months = useMemo(() => {
    // console.log('get month', value?.[0]?.format('YYYY-MM-DD'), month);
    const prevMonth = dayjs(month).subtract(1, 'month');
    const middleMonths = [];
    for (let i = 0; i < calendarNumber; i += 1) {
      const midMonth = dayjs(month).add(i, 'month');
      middleMonths.push({
        month: midMonth.format('YYYY-MM'),
        data: getDateArray(midMonth, { min, max, isoWeek, range, value, hoveringDate }),
      });
    }
    const nextMonth = dayjs(month).add(calendarNumber, 'month');

    return [
      {
        month: prevMonth.format('YYYY-MM'),
        data: getDateArray(prevMonth, { min, max, isoWeek, range, value, hoveringDate }),
      },
      ...middleMonths,
      {
        month: nextMonth.format('YYYY-MM'),
        data: getDateArray(nextMonth, { min, max, isoWeek, range, value, hoveringDate }),
      },
    ];
  }, [value, month, hoveringDate]);

  console.log(months);

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
            months.map((m) => (
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
          months.map((m) => (
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
                { ...pick(props, ['isoWeek']) }
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
          months.map((m) => (
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
                {
                  ...pick(props, [
                    'range',
                    'showOutside',
                    'value',
                    'onChange',
                    'itemRender',
                  ])
                }
                onHoverChange={(date) => {
                  setHoveringDate(date);
                }}
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
  // 周一作为一周的第一天
  isoWeek: PropTypes.bool,
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
  isoWeek: true,
};

export default DatePicker;
