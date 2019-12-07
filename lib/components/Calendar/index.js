"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _reactTransitionGroup = require("react-transition-group");

var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));

var _CalendarBody = _interopRequireDefault(require("./CalendarBody"));

var _MonthPicker = _interopRequireDefault(require("../MonthPicker"));

var _timer = require("../../utils/timer");

var _helper = require("../../utils/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Calendar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Calendar, _React$PureComponent);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _this.checkIfHideNextBtn = function (date, maxDate) {
      if (!maxDate) return false;
      var nextMonth = date.clone().add(1, 'month');
      return !!((0, _timer.isMonthAfter)(nextMonth, maxDate) || (0, _timer.isSameDay)(date, maxDate));
    };

    _this.checkIfHidePrevBtn = function (date, minDate) {
      if (!minDate) return false;
      var prevMonth = date.clone().subtract(1, 'month');
      return !!((0, _timer.isMonthBefore)(prevMonth, minDate) || (0, _timer.isSameDay)(date, minDate));
    };

    _this.onPrevClick = function () {
      var _this$props = _this.props,
          minDate = _this$props.minDate,
          onMonthChange = _this$props.onMonthChange;
      var _this$state = _this.state,
          date = _this$state.date,
          animating = _this$state.animating;

      if (!animating) {
        var prevMonth = (0, _moment["default"])(date).subtract(1, 'month');

        if (!(0, _timer.isMonthAfter)((0, _timer.getFirstDayOfMonth)(minDate), (0, _timer.getFirstDayOfMonth)(prevMonth))) {
          if (typeof onMonthChange === 'function') {
            onMonthChange(prevMonth.clone());
          }

          _this.setState({
            animating: true,
            date: prevMonth
          });
        }
      }
    };

    _this.onNextClick = function () {
      var _this$props2 = _this.props,
          maxDate = _this$props2.maxDate,
          onMonthChange = _this$props2.onMonthChange;
      var _this$state2 = _this.state,
          date = _this$state2.date,
          animating = _this$state2.animating;

      if (!animating) {
        var nextMonth = (0, _moment["default"])(date).add(1, 'month');

        if (!(0, _timer.isMonthBefore)((0, _timer.getLastDayOfMonth)(maxDate), (0, _timer.getLastDayOfMonth)(nextMonth))) {
          if (typeof onMonthChange === 'function') {
            onMonthChange(nextMonth.clone());
          }

          _this.setState({
            animating: true,
            date: nextMonth
          });
        }
      }
    };

    _this.changeMode = function () {
      var dateOnly = _this.props.dateOnly;

      if (!dateOnly) {
        _this.setState({
          mode: 'month'
        });
      }
    };

    var defaultValue = props.defaultValue;
    _this.state = {
      animating: false,
      containerHeight: 0,
      // height of container
      containerWidth: 0,
      // width of container
      date: (0, _moment["default"])(defaultValue)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.resizeHandle = function () {
        if (_this2.container) {
          _this2.setState({
            containerHeight: _this2.container.offsetHeight,
            containerWidth: _this2.container.offsetWidth
          });
        }
      };

      window.addEventListener('resize', this.resizeHandle);
      this.setState({
        containerHeight: this.container.offsetHeight,
        containerWidth: this.container.offsetWidth
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props3 = this.props,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          defaultValue = _this$props3.defaultValue,
          onDateChange = _this$props3.onDateChange;

      if (minDate && (0, _timer.isDayBefore)(defaultValue, minDate)) {
        onDateChange(minDate);
      }

      if (maxDate && (0, _timer.isDayAfter)(defaultValue, maxDate)) {
        onDateChange(maxDate);
      }

      if (minDate && maxDate && (0, _timer.isSameDay)(minDate, maxDate)) {
        onDateChange(minDate);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandle);
    }
    /**
     * check hide next btn
     * @param {*} date
     * @param {*} maxDate
     */

  }, {
    key: "monthChange",
    value: function monthChange(date) {
      this.setState({
        mode: 'date',
        date: date
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state3 = this.state,
          mode = _this$state3.mode,
          animating = _this$state3.animating,
          containerWidth = _this$state3.containerWidth,
          date = _this$state3.date,
          containerHeight = _this$state3.containerHeight;
      var _this$props4 = this.props,
          minDate = _this$props4.minDate,
          maxDate = _this$props4.maxDate,
          renderPrevBtn = _this$props4.renderPrevBtn,
          renderNextBtn = _this$props4.renderNextBtn,
          defaultValue = _this$props4.defaultValue,
          dateOnly = _this$props4.dateOnly;
      var hidePrevBtn = this.checkIfHidePrevBtn(date, minDate);
      var hideNextBtn = this.checkIfHideNextBtn(date, maxDate);
      return _react["default"].createElement("div", {
        className: "rdp__container",
        ref: function ref(container) {
          _this3.container = container;
        }
      }, _react["default"].createElement(_CalendarHeader["default"], {
        renderNextBtn: renderNextBtn,
        renderPrevBtn: renderPrevBtn,
        hidePrevBtn: hidePrevBtn,
        hideNextBtn: hideNextBtn,
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick,
        date: date,
        onHeaderClick: this.changeMode
      }), _react["default"].createElement(_CalendarBody["default"], _extends({
        ref: function ref(calendarBody) {
          _this3.calendarBody = calendarBody;
        },
        isAnimating: animating,
        bodyWidth: containerWidth,
        animateEnd: function animateEnd() {
          return _this3.setState({
            animating: false
          });
        },
        date: date
      }, this.props)), _react["default"].createElement(_reactTransitionGroup.CSSTransition, {
        "in": mode === 'month',
        appear: true,
        classNames: "month",
        timeout: 300,
        unmountOnExit: true
      }, _react["default"].createElement(_MonthPicker["default"], {
        className: "rdp__months-absolute",
        style: {
          height: containerHeight
        },
        defaultValue: defaultValue,
        onMonthChange: this.monthChange
      })));
    }
  }]);

  return Calendar;
}(_react["default"].PureComponent);

Calendar.propTypes = {
  // visible view month
  defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  // start of range date or single date
  startDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  // end of range date
  endDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  // min month limit
  minDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  // min month limit
  maxDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  // month change event
  onMonthChange: _propTypes["default"].func,
  // date select only, without month select
  dateOnly: _propTypes["default"].bool,
  mode: _propTypes["default"].string,
  // 是否选择范围，默认否
  range: _propTypes["default"].bool
};
Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  defaultValue: (0, _moment["default"])(),
  dateOnly: true,
  // 默认是选择日期
  mode: _helper.MODE.DATE,
  // 是否选择范围
  range: false
};
var _default = Calendar;
exports["default"] = _default;