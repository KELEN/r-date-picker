"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _classname = _interopRequireDefault(require("classname"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _EnhanceCalendar = _interopRequireDefault(require("../Calendar/EnhanceCalendar"));

var _EnhanceIntlProvider = _interopRequireDefault(require("../EnhanceIntlProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DatePicker = function DatePicker(props) {
  var _classNames;

  var startDate = props.startDate,
      endDate = props.endDate,
      hoveringDate = props.hoveringDate,
      className = props.className;
  var cls = (0, _classname["default"])((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'rdp-datepicker-container', true), _classNames));
  return _react["default"].createElement("div", {
    className: cls
  }, _react["default"].createElement(_Calendar["default"], _extends({
    startDate: startDate || hoveringDate,
    endDate: endDate || hoveringDate
  }, props)));
};

DatePicker.propTypes = {
  // default selected dates
  defaultDate: _propTypes["default"].oneOfType([_propTypes["default"].shape(), _propTypes["default"].array]),
  // init visible current month, default is current month
  defaultValue: _propTypes["default"].shape(),
  // set range
  ranges: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].shape(), _propTypes["default"].array])))
};
DatePicker.defaultProps = {
  defaultValue: (0, _moment["default"])(),
  defaultDate: null,
  ranges: []
};

var _default = (0, _EnhanceIntlProvider["default"])((0, _EnhanceCalendar["default"])(DatePicker));

exports["default"] = _default;