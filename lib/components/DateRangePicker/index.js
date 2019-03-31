"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireDefault(require("react"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _reactIntl = require("react-intl");

var _moment = _interopRequireWildcard(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _en = _interopRequireDefault(require("../../languages/en"));

var _zhCN = _interopRequireDefault(require("../../languages/zh-CN"));

var _classname = _interopRequireDefault(require("classname"));

var _EnhanceCalendar = _interopRequireDefault(require("../Calendar/EnhanceCalendar"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var messages = {
  en: _en.default,
  zh_CN: _zhCN.default
};

var DateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateRangePicker, _React$Component);

  function DateRangePicker(props) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePicker).call(this, props));
    _this.state = {
      isHovering: false,
      leftMaxDate: (0, _moment.default)().endOf('month'),
      rightMinDate: (0, _moment.default)().add(1, 'month').startOf('month'),
      startMonth: (0, _moment.default)(),
      endMonth: (0, _moment.default)().add(1, 'month')
    };
    _this.onStartMonthChange = _this.onStartMonthChange.bind(_assertThisInitialized(_this));
    _this.onEndMonthChange = _this.onEndMonthChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "onStartMonthChange",
    value: function onStartMonthChange(date) {
      this.setState({
        startMonth: date,
        rightMinDate: date.clone().add(1, 'month').startOf('month')
      });
    }
  }, {
    key: "onEndMonthChange",
    value: function onEndMonthChange(date) {
      this.setState({
        endMonth: date,
        leftMaxDate: date.clone().subtract(1, 'month').endOf('month')
      });
    }
  }, {
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
          _this$props$language = _this$props.language,
          language = _this$props$language === void 0 ? 'zh_CN' : _this$props$language;
      var cls = (0, _classname.default)((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'rdp-range__container', true), _classNames));
      return _react.default.createElement(_reactIntl.IntlProvider, {
        locale: "en",
        messages: messages[language]
      }, _react.default.createElement("div", {
        className: cls
      }, _react.default.createElement("div", {
        className: "rdp-range__calendar rdp-range__left"
      }, _react.default.createElement(_Calendar.default, _extends({}, this.props, {
        range: true,
        minDate: minDate,
        maxDate: leftMaxDate,
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate,
        currentMonth: startMonth,
        onMonthChange: this.onStartMonthChange
      }))), _react.default.createElement("div", {
        className: "rdp-range__calendar rdp-range__right"
      }, _react.default.createElement(_Calendar.default, _extends({}, this.props, {
        range: true,
        minDate: rightMinDate,
        maxDate: maxDate,
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate,
        currentMonth: endMonth,
        onMonthChange: this.onEndMonthChange
      })))));
    }
  }]);

  return DateRangePicker;
}(_react.default.Component);

DateRangePicker.propTypes = {
  defaultValue: _propTypes.default.array.isRequired,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object
};
DateRangePicker.defaultProps = {
  defaultValue: [],
  minDate: null,
  maxDate: null
};

var _default = (0, _EnhanceCalendar.default)(DateRangePicker, {
  range: true
});

exports.default = _default;