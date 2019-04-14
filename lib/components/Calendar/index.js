"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireWildcard(require("moment"));

var _en = require("../../languages/en");

var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));

var _CalendarLabel = _interopRequireDefault(require("./CalendarLabel"));

var _CalendarBody = _interopRequireDefault(require("./CalendarBody"));

var _timer = require("../../utils/timer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
    _this.state = {
      animating: false,
      currentMonth: props.currentMonth // default is today

    };
    _this.onPrevClick = _this.onPrevClick.bind(_assertThisInitialized(_this));
    _this.onNextClick = _this.onNextClick.bind(_assertThisInitialized(_this));
    _this.checkIfHideNextBtn = _this.checkIfHideNextBtn.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * check hide next btn
   * @param {*} currentMonth
   * @param {*} maxDate
   */


  _createClass(Calendar, [{
    key: "checkIfHideNextBtn",
    value: function checkIfHideNextBtn(currentMonth, maxDate) {
      if (!maxDate) return false;
      var nextMonth = currentMonth.clone().add(1, 'month');
      return !!((0, _timer.isMonthAfter)(nextMonth, maxDate) || (0, _timer.isSameDay)(currentMonth, maxDate));
    }
    /**
     * check hide prev btn
     * @param {*} currentMonth
     * @param {*} minDate
     */

  }, {
    key: "checkIfHidePrevBtn",
    value: function checkIfHidePrevBtn(currentMonth, minDate) {
      if (!minDate) return false;
      var prevMonth = currentMonth.clone().subtract(1, 'month');
      return !!((0, _timer.isMonthBefore)(prevMonth, minDate) || (0, _timer.isSameDay)(currentMonth, minDate));
    }
    /**
     * prev btn click
     */

  }, {
    key: "onPrevClick",
    value: function onPrevClick() {
      var _this$props = this.props,
          minDate = _this$props.minDate,
          onMonthChange = _this$props.onMonthChange;
      var _this$state = this.state,
          currentMonth = _this$state.currentMonth,
          animating = _this$state.animating;

      if (!animating) {
        var prevMonth = (0, _moment.default)(currentMonth).subtract(1, 'month');

        if (!(0, _timer.isMonthAfter)((0, _timer.getFirstDayOfMonth)(minDate), (0, _timer.getFirstDayOfMonth)(prevMonth))) {
          onMonthChange && onMonthChange(prevMonth.clone());
          this.setState({
            animating: true,
            currentMonth: prevMonth
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
      var _this$props2 = this.props,
          maxDate = _this$props2.maxDate,
          onMonthChange = _this$props2.onMonthChange;
      var _this$state2 = this.state,
          currentMonth = _this$state2.currentMonth,
          animating = _this$state2.animating;

      if (!animating) {
        var nextMonth = (0, _moment.default)(currentMonth).add(1, 'month');

        if (!(0, _timer.isMonthBefore)((0, _timer.getLastDayOfMonth)(maxDate), (0, _timer.getLastDayOfMonth)(nextMonth))) {
          onMonthChange && onMonthChange(nextMonth.clone());
          this.setState({
            animating: true,
            currentMonth: nextMonth
          });
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextMinDate = nextProps.minDate,
          nextMaxDate = nextProps.maxDate,
          nextCurrentMonth = nextProps.currentMonth;
      var currentMonth = this.state.currentMonth;

      if (nextMinDate && (0, _timer.isMonthBefore)(currentMonth, nextMinDate)) {
        this.setState({
          currentMonth: nextMinDate
        });
      }

      if (nextMaxDate && (0, _timer.isMonthAfter)(currentMonth, nextMaxDate)) {
        this.setState({
          currentMonth: nextMaxDate
        });
      }

      if (nextMaxDate && nextMinDate && (0, _timer.isSameDay)(nextMaxDate, nextMinDate)) {
        this.setState({
          currentMonth: nextMaxDate
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var labelKeys = Object.keys(_en.WEEK_DAYS);
      var _this$state3 = this.state,
          currentMonth = _this$state3.currentMonth,
          animating = _this$state3.animating;
      var _this$props3 = this.props,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          renderPrevBtn = _this$props3.renderPrevBtn,
          renderNextBtn = _this$props3.renderNextBtn;
      var hidePrevBtn = this.checkIfHidePrevBtn(currentMonth, minDate);
      var hideNextBtn = this.checkIfHideNextBtn(currentMonth, maxDate);
      return _react.default.createElement("div", {
        className: "rdp__container"
      }, _react.default.createElement(_CalendarHeader.default, {
        renderNextBtn: renderNextBtn,
        renderPrevBtn: renderPrevBtn,
        currentMonth: currentMonth,
        hidePrevBtn: hidePrevBtn,
        hideNextBtn: hideNextBtn,
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick
      }), _react.default.createElement(_CalendarLabel.default, {
        labels: labelKeys
      }), _react.default.createElement(_CalendarBody.default, _extends({}, this.props, {
        isAnimating: animating,
        animateEnd: function animateEnd() {
          return _this2.setState({
            animating: false
          });
        },
        currentMonth: currentMonth
      })));
    }
  }]);

  return Calendar;
}(_react.default.PureComponent);

Calendar.propType = {
  // visible view month
  currentMonth: _propTypes.default.object,
  // start of range date or single date
  startDate: _propTypes.default.object,
  // end of range date
  endDate: _propTypes.default.object,
  // min month limit
  minDate: _propTypes.default.object,
  // min month limit
  maxDate: _propTypes.default.object,
  // month change event
  onMonthChange: _propTypes.default.func
};
Calendar.defaultProps = {
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null,
  currentMonth: (0, _moment.default)()
};
var _default = Calendar;
exports.default = _default;