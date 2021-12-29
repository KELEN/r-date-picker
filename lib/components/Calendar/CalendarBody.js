"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CalendarBody = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CalendarBody, _React$PureComponent);

  var _super = _createSuper(CalendarBody);

  function CalendarBody(props) {
    var _this;

    _classCallCheck(this, CalendarBody);

    _this = _super.call(this, props);
    var defaultValue = props.defaultValue,
        ranges = props.ranges;
    _this.state = {
      allDays: _this.getAllDays(defaultValue),
      moveNext: false,
      movePrev: false
    };

    if (ranges) {
      _this.checkInRange = (0, _timer.checkInRange)(ranges);
    }

    _this.renderCurrMonthDays = _this.renderCurrMonthDays.bind(_assertThisInitialized(_this));
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
      var prevMonthDays = this.renderPrevMonthDays(startOfMonth, startNum);
      var currMonthDays = this.renderCurrMonthDays(startOfMonth, daysInMonth);
      var nextMonthDays = this.renderNextMonthDays(nextMonth.startOf('month'), 42 - prevMonthDays.length - currMonthDays.length);
      return _defineProperty({}, startOfMonth.format('YYYYMMDD'), [].concat(_toConsumableArray(prevMonthDays), _toConsumableArray(currMonthDays), _toConsumableArray(nextMonthDays)));
    }
    /**
     * render last month
     */

  }, {
    key: "renderPrevMonthDays",
    value: function renderPrevMonthDays(firstDay, count) {
      var emptyDays = [];
      var start = (0, _moment["default"])(firstDay).subtract(count, 'days');
      var i = -1;

      while (count--) {
        emptyDays.push({
          num: start.format('D'),
          date: null,
          key: start.format('YYYYMMDD'),
          inMonth: false,
          isDisable: true
        });
        start = (0, _moment["default"])(firstDay).subtract(count, 'days');
      }

      return emptyDays;
    }
    /**
     * render current month
     */

  }, {
    key: "renderCurrMonthDays",
    value: function renderCurrMonthDays(firstDay, count) {
      var realDays = [];
      var i = 1;

      while (count--) {
        var date = (0, _moment["default"])(firstDay).add(i - 1, 'days');
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
        start = (0, _moment["default"])(start).add(1, 'd');
        i += 1;
      }

      return emptyDays;
    }
  }, {
    key: "getAllDays",
    value: function getAllDays(currDate) {
      var currMonth = (0, _moment["default"])(currDate).startOf('month');
      var prevMonthDays = this.getMonthDays(currMonth.clone().subtract(1, 'months'));
      var currMonthDays = this.getMonthDays(currMonth);
      var nextMonthDays = this.getMonthDays(currMonth.clone().add(1, 'months'));
      return [prevMonthDays, currMonthDays, nextMonthDays];
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          defaultValue = _this$props.defaultValue,
          isAnimating = _this$props.isAnimating;
      var prevDefaultValue = prevProps.defaultValue;

      if (!(0, _timer.isSameDay)(defaultValue, prevDefaultValue)) {
        // next date no equal current date recalculate days
        if (defaultValue.isBefore(prevDefaultValue)) {
          // prev
          this.setState({
            movePrev: true,
            moveNext: false
          });
        }

        if (defaultValue.isAfter(prevDefaultValue)) {
          // next
          this.setState({
            movePrev: false,
            moveNext: true
          });
        } // set current month not by prev or next btn


        if (!isAnimating) {
          this.setState({
            allDays: this.getAllDays(defaultValue)
          });
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e, date) {
      var onDateClick = this.props.onDateClick;
      onDateClick && onDateClick(date, e);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e, date) {
      var onDateChange = this.props.onDateChange;
      onDateChange && onDateChange(date, e);
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(e, date) {
      var onHoveringDateChange = this.props.onHoveringDateChange;
      onHoveringDateChange && onHoveringDateChange(date, e);
    }
  }, {
    key: "transitionEndHandle",
    value: function transitionEndHandle(e) {
      if (e.propertyName == 'transform') {
        var _this$state = this.state,
            movePrev = _this$state.movePrev,
            moveNext = _this$state.moveNext;
        var _this$props2 = this.props,
            defaultValue = _this$props2.defaultValue,
            animateEnd = _this$props2.animateEnd;
        var allDays = this.getAllDays(defaultValue);
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
      var _this$props3 = this.props,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate,
          isAnimating = _this$props3.isAnimating,
          range = _this$props3.range,
          itemRender = _this$props3.itemRender,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          disabledDates = _this$props3.disabledDates,
          selectable = _this$props3.selectable,
          bodyWidth = _this$props3.bodyWidth,
          labels = _this$props3.labels,
          showOutsideDays = _this$props3.showOutsideDays;

      var renderRowDays = function renderRowDays(days) {
        return days.map(function (item) {
          var cls = (0, _classname["default"])({
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
          return /*#__PURE__*/_react["default"].createElement("div", {
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
          }, itemRender ? itemRender(item) : item.inMonth && !showOutsideDays ? item.num : null);
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

        return rowArray.map(function (rowDays) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "rdp__days-row",
            key: rowDays.key
          }, renderRowDays(rowDays));
        });
      };

      var renderAllDays = function renderAllDays(allDays) {
        console.log(allDays);
        return allDays.map(function (pageDays, idx) {
          // base on key format is { YYYYMMDD }
          var key = Object.keys(pageDays)[0];
          var cls = (0, _classname["default"])({
            'rdp__view': true,
            'rdp--hidden': !isAnimating && idx !== 1 // the middle is visible

          });
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: cls,
            key: key
          }, renderDays(pageDays[key]));
        });
      };

      var cls = (0, _classname["default"])({
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
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "rdp__labels"
      }, labels.map(function (item, idx) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "rdp__labels-item",
          key: idx
        }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: item
        }));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: cls,
        style: bodyStyle,
        onTransitionEnd: this.transitionEndHandle
      }, renderAllDays(allDays)));
    }
  }]);

  return CalendarBody;
}(_react["default"].PureComponent);

var propTypes = {
  labels: _propTypes["default"].array.isRequired,
  minDate: _propTypes["default"].object,
  maxDate: _propTypes["default"].object,
  disabledDates: _propTypes["default"].array,
  defaultValue: _propTypes["default"].object,
  onHoveringDateChange: _propTypes["default"].func,
  onDateChange: _propTypes["default"].func,
  // date change event
  isAnimating: _propTypes["default"].bool.isRequired,
  // if body is animating
  onDateRangeChange: _propTypes["default"].func,
  // day range change event

  /**
   * 是否选择范围
   */
  range: _propTypes["default"].bool,

  /**
   * 自定义渲染日期
   */
  itemRender: _propTypes["default"].func,

  /**
   * 是否可选择
   */
  selectable: _propTypes["default"].bool,

  /**
   * 日期点击事件
   */
  onDateClick: _propTypes["default"].func,

  /**
   * 是否显示不在当前月份的日期
   */
  showOutsideDays: _propTypes["default"].bool
};
var defaultProps = {
  isAnimating: false,
  selectable: true,
  disabledDates: [],
  range: false,

  /**
   * 默认不展示不在当前月份的日期
   */
  showOutsideDays: false
};
CalendarBody.propTypes = propTypes;
CalendarBody.defaultProps = defaultProps;
var _default = CalendarBody;
exports["default"] = _default;