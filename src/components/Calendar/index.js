import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group'
import { injectIntl } from 'react-intl'
import { WEEK_DAYS } from '../../languages/en'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import MonthPicker from '../MonthPicker'
import { isMonthAfter, isMonthBefore, getFirstDayOfMonth, getLastDayOfMonth, isSameDay } from '../../utils/timer'

class Calendar extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      mode: 'date',                       // current select mode
      animating: false,
      containerHeight: 0,                 // height of container
      containerWidth: 0,                  // width of container
      defaultValue: props.defaultValue    // default is today
    }

    this.onPrevClick = this.onPrevClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.monthChange = this.monthChange.bind(this)
  }

  componentDidMount() {
    this.resizeHandle = function() {
      if (this.container) {
        this.setState({
          containerHeight: this.container.offsetHeight,
          containerWidth: this.container.offsetWidth
        })
      }
    }.bind(this)
    window.addEventListener('resize', this.resizeHandle)

    this.setState({
      containerHeight: this.container.offsetHeight,
      containerWidth: this.container.offsetWidth
    })
  }

  componentDidUpdate() {
    const {
      containerWidth,
      containerHeight,
    } = this.state;

    const {
      offsetWidth,
      offsetHeight,
    } = this.container;

    if (containerWidth !== offsetWidth || containerHeight !== offsetHeight) {
      this.setState({
        containerHeight: offsetHeight,
        containerWidth: offsetWidth
      })
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandle)
  }

  /**
   * check hide next btn
   * @param {*} defaultValue
   * @param {*} maxDate
   */
  checkIfHideNextBtn(defaultValue, maxDate) {
    if (!maxDate) return false
    const nextMonth = defaultValue.clone().add(1, 'month')
    return !!(isMonthAfter(nextMonth, maxDate) || isSameDay(defaultValue, maxDate));
  }

  /**
   * check hide prev btn
   * @param {*} defaultValue
   * @param {*} minDate
   */
  checkIfHidePrevBtn(defaultValue, minDate) {
    if (!minDate) return false
    const prevMonth = defaultValue.clone().subtract(1, 'month')
    return !!(isMonthBefore(prevMonth, minDate) || isSameDay(defaultValue, minDate));
  }

  /**
   * prev btn click
   */
  onPrevClick() {
    const { minDate, onMonthChange } = this.props
    const { defaultValue, animating } = this.state
    if (!animating) {
      const prevMonth = moment(defaultValue).subtract(1, 'month')
      if (!isMonthAfter(getFirstDayOfMonth(minDate), getFirstDayOfMonth(prevMonth))) {
        onMonthChange && onMonthChange(prevMonth.clone())
        this.setState({
          animating: true,
          defaultValue: prevMonth
        })
      }
    }
  }

  /**
   * next btn click
   */
  onNextClick() {
    const { maxDate, onMonthChange } = this.props
    const { defaultValue, animating } = this.state
    if (!animating) {
      const nextMonth = moment(defaultValue).add(1, 'month')
      if (!isMonthBefore(getLastDayOfMonth(maxDate), getLastDayOfMonth(nextMonth))) {
        onMonthChange && onMonthChange(nextMonth.clone())
        this.setState({
          animating: true,
          defaultValue: nextMonth
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { minDate: nextMinDate, maxDate: nextMaxDate, defaultValue: nextdefaultValue } = nextProps
    const { defaultValue } = this.state

    if (nextMinDate && isMonthBefore(defaultValue, nextMinDate)) {
      this.setState({
        defaultValue: nextMinDate
      })
    }

    if (nextMaxDate && isMonthAfter(defaultValue, nextMaxDate)) {
      this.setState({
        defaultValue: nextMaxDate
      })
    }

    if (nextMaxDate && nextMinDate && isSameDay(nextMaxDate, nextMinDate)) {
      this.setState({
        defaultValue: nextMaxDate
      })
    }
  }

  changeMode(mode) {
    this.setState({
      mode: mode
    })
  }

  monthChange(date) {
    this.setState({
      mode: 'date',
      defaultValue: date
    })
  }

  render() {
    const labelKeys = Object.keys(WEEK_DAYS)

    const {
      defaultValue,
      animating,
      containerWidth,
      mode,
      containerHeight
    } = this.state

    const {
      minDate,
      maxDate,
      renderPrevBtn,
      renderNextBtn,
      dateOnly,
      intl: { formatMessage },
      headerFormat,
    } = this.props

    const hidePrevBtn = this.checkIfHidePrevBtn(defaultValue, minDate)
    const hideNextBtn = this.checkIfHideNextBtn(defaultValue, maxDate)

    const year = defaultValue.get('year'), month = defaultValue.get('month') + 1;

    return (
      <div
        className="rdp__container"
        ref={(container) => {
          this.container = container;
        }}
      >
        <CalendarHeader
          renderNextBtn={ renderNextBtn }
          renderPrevBtn={ renderPrevBtn }
          hidePrevBtn={ hidePrevBtn }
          hideNextBtn={ hideNextBtn }
          onPrevClick={ this.onPrevClick }
          onNextClick={ this.onNextClick }
        >
          <span onClick={ () => !dateOnly && this.changeMode('month') }>
            { moment(defaultValue).format(headerFormat) }
          </span>
        </CalendarHeader>
        <CalendarBody
          ref={(calendarBody) => { this.calendarBody = calendarBody }}
          { ...this.props }
          labels={labelKeys}
          isAnimating={ animating }
          bodyWidth={ containerWidth }
          animateEnd={ () => this.setState({ animating: false }) }
          defaultValue={ defaultValue }
        />
        <CSSTransition
          in={mode === 'month'}
          appear={true}
          classNames="month"
          timeout={300}
          unmountOnExit>
          {
            <MonthPicker
              className="rdp__months-absolute"
              style={{
                height: containerHeight
              }}
              minDate={ minDate }
              defaultValue={ defaultValue }
              onMonthChange={ this.monthChange }
            />
          }
        </CSSTransition>
      </div>
    )
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
  /**
   * 头部日期格式化
   */
  headerFormat: PropTypes.string,
}

Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  defaultValue: moment(),
  dateOnly: true,
  /**
   * 默认是 YYYY-MM
   */
  headerFormat: 'YYYY-MM'
}


export default injectIntl(Calendar);
