"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _timer = require("../../utils/timer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CalendarBody =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CalendarBody, _React$PureComponent);

  function CalendarBody(props) {
    var _this;

    _classCallCheck(this, CalendarBody);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarBody).call(this, props));
    _this.state = {
      allDays: _this.getAllDays(props.currentMonth),
      moveNext: false,
      movePrev: false
    };

    if (props.ranges) {
      _this.checkInRange = (0, _timer.checkInRange)(props.ranges);
    }

    _this.renderCurrentMonthDays = _this.renderCurrentMonthDays.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.transitionEndHandle = _this.transitionEndHandle.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CalendarBody, [{
    key: "getMonthDays",
    value: function getMonthDays(startOfMonth) {
      var daysInMonth = startOfMonth.daysInMonth(); // total num in month

      var startNum = startOfMonth.weekday(); // the first weekday

      var nextMonth = startOfMonth.clone().add(1, 'month');
      var endNum = 7 - nextMonth.weekday();
      return _defineProperty({}, startOfMonth.format('YYYYMMDD'), [].concat(_toConsumableArray(this.renderPrevMonthDays(startOfMonth, startNum)), _toConsumableArray(this.renderCurrentMonthDays(startOfMonth, daysInMonth)), _toConsumableArray(this.renderNextMonthDays(nextMonth.startOf('month'), endNum))));
    }
    /**
     * render last month
     */

  }, {
    key: "renderPrevMonthDays",
    value: function renderPrevMonthDays(firstDay, count) {
      var emptyDays = [];
      var start = (0, _moment.default)(firstDay).subtract(count, 'days');
      var i = -1;

      while (count--) {
        emptyDays.push({
          num: '',
          date: null,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        });
        start = (0, _moment.default)(firstDay).subtract(count, 'days');
      }

      return emptyDays;
    }
    /**
     * render current month
     */

  }, {
    key: "renderCurrentMonthDays",
    value: function renderCurrentMonthDays(firstDay, count) {
      var realDays = [];
      var i = 1;

      while (count--) {
        var date = (0, _moment.default)(firstDay).add(i - 1, 'days');
        realDays.push({
          num: i,
          active: false,
          date: date,
          connect: false,
          isStart: false,
          isEnd: false,
          isDisable: false,
          key: date.format('YYYYMMDD'),
          inMonth: true
        });
        i++;
      }

      return realDays;
    }
    /**
     * render next month empty days
     * @param {*} start
     * @param {*} count
     */

  }, {
    key: "renderNextMonthDays",
    value: function renderNextMonthDays(start, count) {
      var emptyDays = [];

      if (count >= 7) {
        return emptyDays;
      }

      var i = 1;

      while (count--) {
        emptyDays.push({
          num: '',
          date: null,
          start: start,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        });
        start = (0, _moment.default)(start).add(1, 'd');
        i += 1;
      }

      return emptyDays;
    }
  }, {
    key: "getAllDays",
    value: function getAllDays(currDate) {
      var currMonth = (0, _moment.default)(currDate).startOf('month');
      var prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'));
      var currMonthDays = this.getMonthDays(currMonth);
      var nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'));
      return [prevMonthDays, currMonthDays, nextMonthDays];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _timer.isSameDay)(nextProps.currentMonth, this.props.currentMonth)) {
        // next date no equal current date recalculate days
        if (nextProps.currentMonth.isBefore(this.props.currentMonth)) {
          // prev
          this.setState({
            movePrev: true,
            moveNext: false
          });
        }

        if (nextProps.currentMonth.isAfter(this.props.currentMonth)) {
          // next
          this.setState({
            movePrev: false,
            moveNext: true
          });
        } // set current month not by prev or next btn


        if (!nextProps.isAnimating) {
          this.setState({
            allDays: this.getAllDays(nextProps.currentMonth)
          });
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e, date) {
      var onDateClick = this.props.onDateClick;
      onDateClick && onDateClick(e, date);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e, date) {
      var onDateChange = this.props.onDateChange;
      onDateChange && onDateChange(e, date);
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(e, date) {
      var onHoveringDateChange = this.props.onHoveringDateChange;
      onHoveringDateChange && onHoveringDateChange(e, date);
    }
  }, {
    key: "transitionEndHandle",
    value: function transitionEndHandle(e) {
      if (e.propertyName == 'transform') {
        var _this$state = this.state,
            movePrev = _this$state.movePrev,
            moveNext = _this$state.moveNext;
        var _this$props = this.props,
            currentMonth = _this$props.currentMonth,
            animateEnd = _this$props.animateEnd;
        var allDays = this.getAllDays(currentMonth);
        var currAllDays = this.state.allDays;

        if (movePrev) {
          // prev
          currAllDays.pop();
          currAllDays.unshift(allDays.shift());
          this.setState({
            movePrev: false,
            moveNext: false,
            allDays: currAllDays
          }, function () {
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
            allDays: currAllDays
          }, function () {
            animateEnd();
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          allDays = _this$state2.allDays,
          movePrev = _this$state2.movePrev,
          moveNext = _this$state2.moveNext;
      var _this$props2 = this.props,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate,
          isAnimating = _this$props2.isAnimating,
          range = _this$props2.range,
          itemRender = _this$props2.itemRender,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate,
          disabledDates = _this$props2.disabledDates,
          selectable = _this$props2.selectable,
          bodyWidth = _this$props2.bodyWidth;

      var renderRowDays = function renderRowDays(days) {
        return days.map(function (item) {
          var cls = (0, _classname.default)({
            'rdp__days-item--grey': !item.inMonth || item.isDisable,
            'rdp__days-item': true,
            'rdb__days-item-active--connect': item.connect,
            'rdp__days-item-active--start': item.isStart,
            'rdp__days-item-active--end': item.isEnd,
            'rdp__days-item-active--single': !endDate && item.isStart && !range,
            'rdp__days-item-active--range-start': item.isRangeStart,
            'rdp__days-item-active--range-end': item.isRangeEnd,
            'rdp__days-item-active--range-connect': item.isInRange
          });
          var allowDownEvent = !item.isDisable && item.inMonth && selectable;
          var allowHoverEvent = range && item.inMonth && !item.isDisable;
          return _react.default.createElement("div", {
            className: cls,
            key: item.key,
            "data-label": item.dayStr,
            "data-key": item.key,
            onClick: function onClick() {
              return _this2.handleClick(event, item.date);
            },
            onMouseDown: function onMouseDown() {
              return allowDownEvent && _this2.handleMouseDown(event, item.date);
            },
            onMouseEnter: function onMouseEnter() {
              return allowHoverEvent && _this2.handleMouseEnter(event, item.date);
            }
          }, itemRender ? itemRender(item) : item.num);
        });
      };

      var renderDays = function renderDays(days) {
        var rowArray = [];
        var arr = [];
        days.forEach(function (item, idx) {
          if (item.date) {
            // only handle item has date
            if (_this2.checkInRange) {
              var checkRangeRet = _this2.checkInRange(item.date);

              item.isRangeStart = checkRangeRet.isRangeStart;
              item.isInRange = checkRangeRet.isInRange;
              item.isRangeEnd = checkRangeRet.isRangeEnd;
            }

            item.isDisable = (0, _timer.isDayBefore)(item.date, minDate) || (0, _timer.isDayAfter)(item.date, maxDate) || (0, _timer.dateDisabled)(disabledDates, item.date);

            if (startDate && endDate) {
              item.isStart = (0, _timer.isSameDay)(startDate, item.date);
              item.isEnd = (0, _timer.isSameDay)(endDate, item.date);
              item.active = (0, _timer.isSameDay)(startDate, item.date) || (0, _timer.isSameDay)(endDate, item.date);
              item.connect = (0, _timer.isDayAfter)(item.date, startDate) && (0, _timer.isDayBefore)(item.date, endDate);
            } else {
              item.isStart = (0, _timer.isSameDay)(startDate, item.date);
              item.active = (0, _timer.isSameDay)(startDate, item.date);
              item.isEnd = (0, _timer.isSameDay)(endDate, item.date);
              item.connect = false;
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
        }); // last row

        if (arr.length) {
          rowArray.push(arr);
        }

        return rowArray.map(function (rowDays, idx) {
          return _react.default.createElement("div", {
            className: "rdp-days__row",
            key: idx
          }, renderRowDays(rowDays));
        });
      };

      var renderAllDays = function renderAllDays(allDays) {
        return allDays.map(function (pageDays, idx) {
          // base on key format is { YYYYMMDD }
          var key = Object.keys(pageDays)[0];
          var cls = (0, _classname.default)({
            'rdp__view': true,
            'rdp--hidden': !isAnimating && idx !== 1 // the middle is visible

          });
          return _react.default.createElement("div", {
            className: cls,
            key: key
          }, renderDays(pageDays[key]));
        });
      };

      var cls = (0, _classname.default)({
        'rdp__animation-left': isAnimating && moveNext,
        'rdp__animation-right': isAnimating && movePrev,
        'rdp__body': true
      });
      var translateX = 0;

      if (movePrev) {
        translateX = bodyWidth;
      }

      if (moveNext) {
        translateX = -bodyWidth;
      }

      var bodyStyle = {
        width: bodyWidth * 3,
        left: -bodyWidth,
        transform: isAnimating && "translateX(".concat(translateX, "px)")
      };
      return _react.default.createElement("div", {
        className: cls,
        style: bodyStyle,
        onTransitionEnd: this.transitionEndHandle
      }, renderAllDays(allDays));
    }
  }]);

  return CalendarBody;
}(_react.default.PureComponent);

var propTypes = {
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  disabledDates: _propTypes.default.array,
  currentMonth: _propTypes.default.object,
  onHoveringDateChange: _propTypes.default.func,
  onDateChange: _propTypes.default.func,
  // date change event
  isAnimating: _propTypes.default.bool.isRequired,
  // if body is animating
  onDateRangeChange: _propTypes.default.func,
  // day range change event
  range: _propTypes.default.bool,
  // select day range
  itemRender: _propTypes.default.func,
  // day item render function
  selectable: _propTypes.default.bool,
  // if selectable
  onDateClick: _propTypes.default.func // date click event

};
var defaultProps = {
  isAnimating: false,
  selectable: true,
  disabledDates: [],
  range: false // select range date

};
CalendarBody.propTypes = propTypes;
CalendarBody.defaultProps = defaultProps;
var _default = CalendarBody;
exports.default = _default;