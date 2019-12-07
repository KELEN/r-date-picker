"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _EnhanceCalendar = _interopRequireDefault(require("../Calendar/EnhanceCalendar"));

var _EnhanceIntlProvider = _interopRequireDefault(require("../EnhanceIntlProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateRangePicker, _React$Component);

  function DateRangePicker(props) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePicker).call(this, props));

    _this.onStartMonthChange = function (date) {
      _this.setState({
        startMonth: date,
        rightMinDate: date.clone().add(1, 'month').startOf('month')
      });
    };

    _this.onEndMonthChange = function (date) {
      _this.setState({
        endMonth: date,
        leftMaxDate: date.clone().subtract(1, 'month').endOf('month')
      });
    };

    _this.state = {
      leftMaxDate: (0, _moment["default"])().endOf('month'),
      rightMinDate: (0, _moment["default"])().add(1, 'month').startOf('month'),
      startMonth: (0, _moment["default"])(),
      endMonth: (0, _moment["default"])().add(1, 'month')
    };
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$state = this.state,
          startMonth = _this$state.startMonth,
          endMonth = _this$state.endMonth,
          leftMaxDate = _this$state.leftMaxDate,
          rightMinDate = _this$state.rightMinDate;
      var _this$props = this.props,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          hoveringDate = _this$props.hoveringDate,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          className = _this$props.className,
          single = _this$props.single;
      var cls = (0, _classname["default"])((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'rdp-range__container', true), _classNames));
      var rightMin = rightMinDate || _moment["default"].min(maxDate, rightMinDate) || minDate;
      var leftMax = leftMaxDate || _moment["default"].min(maxDate, leftMaxDate) || minDate.clone().endOf('month');
      return _react["default"].createElement(_react["default"].Fragment, null, !single ? _react["default"].createElement("div", {
        className: cls
      }, _react["default"].createElement("div", {
        className: "rdp-range__calendar rdp-range__left"
      }, _react["default"].createElement(_Calendar["default"], _extends({}, this.props, {
        range: true,
        minDate: minDate,
        maxDate: leftMax,
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate,
        defaultValue: startMonth,
        onMonthChange: this.onStartMonthChange
      }))), _react["default"].createElement("div", {
        className: "rdp-range__calendar rdp-range__right"
      }, _react["default"].createElement(_Calendar["default"], _extends({}, this.props, {
        range: true,
        minDate: rightMin,
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate,
        defaultValue: endMonth,
        onMonthChange: this.onEndMonthChange
      })))) : _react["default"].createElement("div", {
        className: cls
      }, _react["default"].createElement(_Calendar["default"], _extends({}, this.props, {
        range: true,
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate,
        defaultValue: startMonth,
        onMonthChange: this.onEndMonthChange
      }))));
    }
  }]);

  return DateRangePicker;
}(_react["default"].Component);

DateRangePicker.propTypes = {
  defaultDate: _propTypes["default"].oneOfType([_propTypes["default"].shape(), _propTypes["default"].arrayOf(_propTypes["default"].instanceOf(_moment["default"]))]),
  minDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  maxDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  single: _propTypes["default"].bool
};
DateRangePicker.defaultProps = {
  defaultValue: [],
  defaultDate: null,
  minDate: null,
  maxDate: null,
  // 显示一个日历
  single: false
};

var _default = (0, _EnhanceIntlProvider["default"])((0, _EnhanceCalendar["default"])(DateRangePicker, {
  range: true
}));

exports["default"] = _default;