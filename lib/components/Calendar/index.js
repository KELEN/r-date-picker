"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _reactTransitionGroup = require("react-transition-group");

var _reactIntl = require("react-intl");

var _en = require("../../languages/en");

var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));

var _CalendarBody = _interopRequireDefault(require("./CalendarBody"));

var _MonthPicker = _interopRequireDefault(require("../MonthPicker"));

var _timer = require("../../utils/timer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Calendar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Calendar, _React$PureComponent);

  var _super = _createSuper(Calendar);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.call(this, props);
    _this.state = {
      mode: 'date',
      // current select mode
      animating: false,
      containerHeight: 0,
      // height of container
      containerWidth: 0,
      // width of container
      defaultValue: props.defaultValue // default is today

    };
    _this.onPrevClick = _this.onPrevClick.bind(_assertThisInitialized(_this));
    _this.onNextClick = _this.onNextClick.bind(_assertThisInitialized(_this));
    _this.changeMode = _this.changeMode.bind(_assertThisInitialized(_this));
    _this.monthChange = _this.monthChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeHandle = function () {
        if (this.container) {
          this.setState({
            containerHeight: this.container.offsetHeight,
            containerWidth: this.container.offsetWidth
          });
        }
      }.bind(this);

      window.addEventListener('resize', this.resizeHandle);
      this.setState({
        containerHeight: this.container.offsetHeight,
        containerWidth: this.container.offsetWidth
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$state = this.state,
          containerWidth = _this$state.containerWidth,
          containerHeight = _this$state.containerHeight;
      var _this$container = this.container,
          offsetWidth = _this$container.offsetWidth,
          offsetHeight = _this$container.offsetHeight;

      if (containerWidth !== offsetWidth || containerHeight !== offsetHeight) {
        this.setState({
          containerHeight: offsetHeight,
          containerWidth: offsetWidth
        });
      }

      var _this$props = this.props,
          nextMinDate = _this$props.minDate,
          nextMaxDate = _this$props.maxDate,
          nextdefaultValue = _this$props.defaultValue;
      var defaultValue = this.state.defaultValue;

      if (nextMinDate && (0, _timer.isMonthBefore)(defaultValue, nextMinDate)) {
        this.setState({
          defaultValue: nextMinDate
        });
      }

      if (nextMaxDate && (0, _timer.isMonthAfter)(defaultValue, nextMaxDate)) {
        this.setState({
          defaultValue: nextMaxDate
        });
      }

      if (nextMaxDate && nextMinDate && (0, _timer.isSameDay)(nextMaxDate, nextMinDate)) {
        this.setState({
          defaultValue: nextMaxDate
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandle);
    }
    /**
     * check hide next btn
     * @param {*} defaultValue
     * @param {*} maxDate
     */

  }, {
    key: "checkIfHideNextBtn",
    value: function checkIfHideNextBtn(defaultValue, maxDate) {
      if (!maxDate) return false;
      var nextMonth = defaultValue.clone().add(1, 'month');
      return !!((0, _timer.isMonthAfter)(nextMonth, maxDate) || (0, _timer.isSameDay)(defaultValue, maxDate));
    }
    /**
     * check hide prev btn
     * @param {*} defaultValue
     * @param {*} minDate
     */

  }, {
    key: "checkIfHidePrevBtn",
    value: function checkIfHidePrevBtn(defaultValue, minDate) {
      if (!minDate) return false;
      var prevMonth = defaultValue.clone().subtract(1, 'month');
      return !!((0, _timer.isMonthBefore)(prevMonth, minDate) || (0, _timer.isSameDay)(defaultValue, minDate));
    }
    /**
     * prev btn click
     */

  }, {
    key: "onPrevClick",
    value: function onPrevClick() {
      var _this$props2 = this.props,
          minDate = _this$props2.minDate,
          onMonthChange = _this$props2.onMonthChange;
      var _this$state2 = this.state,
          defaultValue = _this$state2.defaultValue,
          animating = _this$state2.animating;

      if (!animating) {
        var prevMonth = (0, _moment["default"])(defaultValue).subtract(1, 'month');

        if (!(0, _timer.isMonthAfter)((0, _timer.getFirstDayOfMonth)(minDate), (0, _timer.getFirstDayOfMonth)(prevMonth))) {
          onMonthChange && onMonthChange(prevMonth.clone());
          this.setState({
            animating: true,
            defaultValue: prevMonth
          });
        }
      }
    }
    /**
     * next btn click
     */

  }, {
    key: "onNextClick",
    value: function onNextClick() {
      var _this$props3 = this.props,
          maxDate = _this$props3.maxDate,
          onMonthChange = _this$props3.onMonthChange;
      var _this$state3 = this.state,
          defaultValue = _this$state3.defaultValue,
          animating = _this$state3.animating;

      if (!animating) {
        var nextMonth = (0, _moment["default"])(defaultValue).add(1, 'month');

        if (!(0, _timer.isMonthBefore)((0, _timer.getLastDayOfMonth)(maxDate), (0, _timer.getLastDayOfMonth)(nextMonth))) {
          onMonthChange && onMonthChange(nextMonth.clone());
          this.setState({
            animating: true,
            defaultValue: nextMonth
          });
        }
      }
    }
  }, {
    key: "changeMode",
    value: function changeMode(mode) {
      this.setState({
        mode: mode
      });
    }
  }, {
    key: "monthChange",
    value: function monthChange(date) {
      this.setState({
        mode: 'date',
        defaultValue: date
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var labelKeys = Object.keys(_en.WEEK_DAYS);
      var _this$state4 = this.state,
          defaultValue = _this$state4.defaultValue,
          animating = _this$state4.animating,
          containerWidth = _this$state4.containerWidth,
          mode = _this$state4.mode,
          containerHeight = _this$state4.containerHeight;
      var _this$props4 = this.props,
          minDate = _this$props4.minDate,
          maxDate = _this$props4.maxDate,
          renderPrevBtn = _this$props4.renderPrevBtn,
          renderNextBtn = _this$props4.renderNextBtn,
          dateOnly = _this$props4.dateOnly,
          formatMessage = _this$props4.intl.formatMessage,
          headerFormat = _this$props4.headerFormat;
      var hidePrevBtn = this.checkIfHidePrevBtn(defaultValue, minDate);
      var hideNextBtn = this.checkIfHideNextBtn(defaultValue, maxDate);
      var year = defaultValue.get('year'),
          month = defaultValue.get('month') + 1;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rdp__container",
        ref: function ref(container) {
          _this2.container = container;
        }
      }, /*#__PURE__*/_react["default"].createElement(_CalendarHeader["default"], {
        renderNextBtn: renderNextBtn,
        renderPrevBtn: renderPrevBtn,
        hidePrevBtn: hidePrevBtn,
        hideNextBtn: hideNextBtn,
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick
      }, /*#__PURE__*/_react["default"].createElement("span", {
        onClick: function onClick() {
          return !dateOnly && _this2.changeMode('month');
        }
      }, (0, _moment["default"])(defaultValue).format(headerFormat))), /*#__PURE__*/_react["default"].createElement(_CalendarBody["default"], _extends({
        ref: function ref(calendarBody) {
          _this2.calendarBody = calendarBody;
        }
      }, this.props, {
        labels: labelKeys,
        isAnimating: animating,
        bodyWidth: containerWidth,
        animateEnd: function animateEnd() {
          return _this2.setState({
            animating: false
          });
        },
        defaultValue: defaultValue
      })), /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
        "in": mode === 'month',
        appear: true,
        classNames: "month",
        timeout: 300,
        unmountOnExit: true
      }, /*#__PURE__*/_react["default"].createElement(_MonthPicker["default"], {
        className: "rdp__months-absolute",
        style: {
          height: containerHeight
        },
        minDate: minDate,
        defaultValue: defaultValue,
        onMonthChange: this.monthChange
      })));
    }
  }]);

  return Calendar;
}(_react["default"].PureComponent);

Calendar.propType = {
  // visible view month
  defaultValue: _propTypes["default"].object,
  // start of range date or single date
  startDate: _propTypes["default"].object,
  // end of range date
  endDate: _propTypes["default"].object,
  // min month limit
  minDate: _propTypes["default"].object,
  // min month limit
  maxDate: _propTypes["default"].object,
  // month change event
  onMonthChange: _propTypes["default"].func,
  // date select only, without month select
  dateOnly: _propTypes["default"].bool,

  /**
   * 头部日期格式化
   */
  headerFormat: _propTypes["default"].string,

  /**
   * 是否显示不在当前月份的日期
   */
  showOutsideDays: _propTypes["default"].bool
};
Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  defaultValue: (0, _moment["default"])(),
  dateOnly: true,

  /**
   * 默认是 YYYY-MM
   */
  headerFormat: 'YYYY-MM',

  /**
   * 默认不展示不在当前月份的日期
   */
  showOutsideDays: false
};

var _default = (0, _reactIntl.injectIntl)(Calendar);

exports["default"] = _default;