"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _classname = _interopRequireDefault(require("classname"));

var _reactIntl = require("react-intl");

var _en = _interopRequireDefault(require("../../languages/en"));

var _zhCN = _interopRequireDefault(require("../../languages/zh-CN"));

var _EnhanceCalendar = _interopRequireDefault(require("../Calendar/EnhanceCalendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var messages = {
  en: _en.default,
  cn: _zhCN.default
};

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));
    var defaultValue = props.defaultValue;
    _this.state = {
      defaultValue: defaultValue // default is today

    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          _this$props$language = _this$props.language,
          language = _this$props$language === void 0 ? 'cn' : _this$props$language,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          hoveringDate = _this$props.hoveringDate,
          className = _this$props.className;
      var cls = (0, _classname.default)((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'rdp-datepicker-container', true), _classNames));
      return _react.default.createElement(_reactIntl.IntlProvider, {
        locale: "en",
        messages: messages[language]
      }, _react.default.createElement("div", {
        className: cls
      }, _react.default.createElement(_Calendar.default, _extends({}, this.props, {
        startDate: startDate || hoveringDate,
        endDate: endDate || hoveringDate
      }))));
    }
  }]);

  return DatePicker;
}(_react.default.Component);

DatePicker.propTypes = {
  // default selected dates
  defaultDate: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  // init visible current month, default is current month
  defaultValue: _propTypes.default.object,
  // set range
  ranges: _propTypes.default.array
};
DatePicker.defaultProps = {
  defaultValue: (0, _moment.default)(),
  defaultDate: null,
  ranges: [],
  dateOnly: false
};

var _default = (0, _EnhanceCalendar.default)(DatePicker);

exports.default = _default;