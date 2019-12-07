"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _reactIntl = require("react-intl");

var _timer = require("../../utils/timer");

var _en = require("../../languages/en");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var labelKeys = Object.keys(_en.WEEK_DAYS);

var CalendarBody =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CalendarBody, _React$PureComponent);

  function CalendarBody(props) {
    var _this;

    _classCallCheck(this, CalendarBody);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarBody).call(this, props));

    _this.updateStateIfNeed = function (date, prevDate) {
      if (!(0, _timer.isSameDay)(date, prevDate)) {
        if ((0, _timer.isDayBefore)(date, prevDate)) {
          // prev
          _this.setState({
            movePrev: true,
            moveNext: false
          });
        }

        if ((0, _timer.isDayAfter)(date, prevDate)) {
          // next
          _this.setState({
            movePrev: false,
            moveNext: true
          });
        }

        if (!_this.isAnimating) {
          _this.setState({
            allDays: _this.getAllDays(prevDate)
          });
        }
      }
    };

    _this.getMonthDays = function (startOfMonth) {
      var daysInMonth = startOfMonth.daysInMonth(); // total num in month

      var startNum = startOfMonth.weekday(); // the first weekday

      var nextMonth = startOfMonth.clone().add(1, 'month');

      var prevMonthDays = _this.renderPrevMonthDays(startOfMonth, startNum);

      var currMonthDays = _this.renderCurrMonthDays(startOfMonth, daysInMonth);

      var nextMonthDays = _this.renderNextMonthDays(nextMonth.startOf('month'), 42 - prevMonthDays.length - currMonthDays.length);

      return _defineProperty({}, startOfMonth.format('YYYYMMDD'), [].concat(_toConsumableArray(prevMonthDays), _toConsumableArray(currMonthDays), _toConsumableArray(nextMonthDays)));
    };

    _this.renderPrevMonthDays = function (firstDay, count) {
      var emptyDays = [];
      var start = (0, _moment["default"])(firstDay).clone().subtract(count, 'days');
      var i = -1;

      while (count--) {
        emptyDays.push({
          num: start.format('D'),
          date: null,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        });
        start = (0, _moment["default"])(firstDay).clone().subtract(count, 'days');
      }

      return emptyDays;
    };

    _this.renderCurrMonthDays = function (firstDay, count) {
      var realDays = [];
      var i = 1;

      while (count--) {
        var date = (0, _moment["default"])(firstDay).clone().add(i - 1, 'days');
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
    };

    _this.renderNextMonthDays = function (start, count) {
      var emptyDays = [];
      var i = 1;

      while (count--) {
        emptyDays.push({
          num: start.format('D'),
          date: null,
          start: start,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        });
        start = (0, _moment["default"])(start).clone().add(1, 'd');
        i += 1;
      }

      return emptyDays;
    };

    _this.getAllDays = function (currDate) {
      var currMonth = (0, _moment["default"])(currDate).startOf('month');

      var prevMonthDays = _this.getMonthDays(currMonth.clone().subtract(1, 'months'));

      var currMonthDays = _this.getMonthDays(currMonth);

      var nextMonthDays = _this.getMonthDays(currMonth.clone().add(1, 'months'));

      return [prevMonthDays, currMonthDays, nextMonthDays];
    };

    _this.handleClick = function (date) {
      var onDateClick = _this.props.onDateClick;
      onDateClick && onDateClick(date);
    };

    _this.handleMouseDown = function (date) {
      var onDateChange = _this.props.onDateChange;
      onDateChange && onDateChange(date);
    };

    _this.handleMouseEnter = function (date) {
      var onHoveringDateChange = _this.props.onHoveringDateChange;
      onHoveringDateChange && onHoveringDateChange(date);
    };

    _this.transitionEndHandle = function (e) {
      if (e.propertyName == 'transform') {
        var _this$state = _this.state,
            movePrev = _this$state.movePrev,
            moveNext = _this$state.moveNext;
        var _this$props = _this.props,
            date = _this$props.date,
            animateEnd = _this$props.animateEnd;

        var allDays = _this.getAllDays(date);

        var currAllDays = _this.state.allDays;

        if (movePrev) {
          // prev
          currAllDays.pop();
          currAllDays.unshift(allDays.shift());

          _this.setState({
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

          _this.setState({
            movePrev: false,
            moveNext: false,
            allDays: currAllDays
          }, function () {
            animateEnd();
          });
        }
      }
    };

    var ranges = props.ranges,
        defaultValue = props.defaultValue;
    _this.state = {
      allDays: _this.getAllDays(props.defaultValue),
      moveNext: false,
      movePrev: false
    };

    if (ranges) {
      _this.checkInRange = (0, _timer.checkInRange)(ranges);
    }

    return _this;
  }

  _createClass(CalendarBody, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevDate = prevProps.date;
      var date = this.props.date;
      this.updateStateIfNeed(date, prevDate);
    }
    /**
     * 动画切换和重新渲染calendar body
     * */

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
          defaultValue = _this$props2.defaultValue,
          isAnimating = _this$props2.isAnimating,
          range = _this$props2.range,
          itemRender = _this$props2.itemRender,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate,
          disabledDates = _this$props2.disabledDates,
          selectable = _this$props2.selectable,
          bodyWidth = _this$props2.bodyWidth,
          itemClass = _this$props2.itemClass,
          labels = _this$props2.labels,
          mode = _this$props2.mode;

      var renderRowDays = function renderRowDays(days) {
        return days.map(function (item) {
          var typeOfItemClass = _typeof(itemClass);

          var itemClassStr = '';

          if (typeOfItemClass === 'function') {
            itemClassStr = itemClass(item) || '';
          }

          if (typeOfItemClass === 'string') {
            itemClassStr = itemClass;
          }

          var commonCls = (0, _classname["default"])(_defineProperty({
            'rdp__days-item--grey': item.isDisable,
            'rdp__days-item--empty': !item.inMonth,
            'rdp__days-item': true
          }, itemClassStr, !!itemClassStr));
          var alternativeCls = '';

          if (range) {
            alternativeCls = (0, _classname["default"])({
              'rdb__days-item-active--connect': item.connect,
              'rdp__days-item-active--start': item.isStart && selectable,
              'rdp__days-item-active--end': item.isEnd,
              'rdp__days-item-active--single': !endDate && item.isStart && !range && selectable,
              'rdp__days-item-active--range-start': item.isRangeStart || item.isRangeAdjacent,
              'rdp__days-item-active--range-end': item.isRangeEnd || item.isRangeAdjacent,
              'rdp__days-item-active--range-connect': item.isInRange && !item.isRangeStart && !item.isRangeEnd
            });
          } else {
            alternativeCls = (0, _classname["default"])({
              'rdp__days-item-active--single': item.active
            });
          }

          var allowDownEvent = !item.isDisable && item.inMonth && selectable;
          var allowHoverEvent = range && item.inMonth && !item.isDisable;
          return _react["default"].createElement("div", {
            className: "".concat(commonCls, " ").concat(alternativeCls),
            key: item.key,
            "data-label": item.dayStr,
            "data-key": item.key,
            onClick: function onClick() {
              return _this2.handleClick(item.date);
            },
            onMouseDown: function onMouseDown() {
              return allowDownEvent && _this2.handleMouseDown(item.date);
            },
            onMouseEnter: function onMouseEnter() {
              return allowHoverEvent && _this2.handleMouseEnter(item.date);
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
              item.isRangeAdjacent = checkRangeRet.isRangeAdjacent;
            }

            item.isDisable = (0, _timer.isDayBefore)(item.date, minDate) || (0, _timer.isDayAfter)(item.date, maxDate) || (0, _timer.dateDisabled)(disabledDates, item.date);

            if (range) {
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
              item.active = (0, _timer.isSameDay)(defaultValue, item.date);
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
          return _react["default"].createElement("div", {
            className: "rdp__days-row",
            key: idx
          }, renderRowDays(rowDays));
        });
      };

      var renderAllDays = function renderAllDays() {
        return allDays.map(function (pageDays, idx) {
          // base on key format is { YYYYMMDD }
          var key = Object.keys(pageDays)[0];
          var cls = (0, _classname["default"])({
            rdp__view: true,
            'rdp--hidden': !isAnimating && idx !== 1 // the middle is visible

          });
          return _react["default"].createElement("div", {
            className: cls,
            key: key
          }, renderDays(pageDays[key]));
        });
      };

      var cls = (0, _classname["default"])({
        'rdp__animation-left': isAnimating && moveNext,
        'rdp__animation-right': isAnimating && movePrev,
        rdp__body: true
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
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
        className: "rdp__labels"
      }, labelKeys.map(function (item, idx) {
        return _react["default"].createElement("div", {
          className: "rdp__labels-item",
          key: item
        }, _react["default"].createElement(_reactIntl.FormattedMessage, {
          id: item
        }));
      })), _react["default"].createElement("div", {
        className: cls,
        style: bodyStyle,
        onTransitionEnd: this.transitionEndHandle
      }, renderAllDays(allDays)));
    }
  }]);

  return CalendarBody;
}(_react["default"].PureComponent);

var propTypes = {
  minDate: _propTypes["default"].shape(),
  maxDate: _propTypes["default"].shape(),
  disabledDates: _propTypes["default"].array,
  defaultValue: _propTypes["default"].shape(),
  onHoveringDateChange: _propTypes["default"].func,
  onDateChange: _propTypes["default"].func,
  // date change event
  isAnimating: _propTypes["default"].bool.isRequired,
  // if body is animating
  onDateRangeChange: _propTypes["default"].func,
  // day range change event
  range: _propTypes["default"].bool,
  // select day range
  itemRender: _propTypes["default"].func,
  // day item render function
  selectable: _propTypes["default"].bool,
  // if selectable
  onDateClick: _propTypes["default"].func,
  // date click event
  itemClass: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  date: _propTypes["default"].shape()
};
var defaultProps = {
  isAnimating: false,
  selectable: true,
  disabledDates: [],
  itemClass: '',
  range: false // select range date

};
CalendarBody.propTypes = propTypes;
CalendarBody.defaultProps = defaultProps;
var _default = CalendarBody;
exports["default"] = _default;