"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _CalendarHeader = _interopRequireDefault(require("../Calendar/CalendarHeader"));

var _MonthBody = _interopRequireDefault(require("./MonthBody"));

var _helper = require("../../utils/helper");

var _EnhanceIntlProvider = _interopRequireDefault(require("../EnhanceIntlProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * month picker
 */
var MonthPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonthPicker, _React$Component);

  function MonthPicker(props) {
    var _this;

    _classCallCheck(this, MonthPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MonthPicker).call(this, props));

    _this.onPrevClick = function () {
      var date = _this.state.date;

      _this.setState({
        date: date.subtract(1, 'year')
      });
    };

    _this.onNextClick = function () {
      var date = _this.state.date;

      _this.setState({
        date: date.add(1, 'year')
      });
    };

    _this.onMonthClick = function (num) {
      var _this$props = _this.props,
          onMonthChange = _this$props.onMonthChange,
          defaultValue = _this$props.defaultValue;
      var date = _this.state.date;
      var newDate = (0, _moment["default"])({
        y: date.format('YYYY'),
        M: num - 1,
        d: defaultValue.format('D')
      });

      _this.setState({
        date: newDate
      });

      onMonthChange(newDate);
    };

    _this.state = {
      date: props.defaultValue
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: "render",
    value: function render() {
      var date = this.state.date;
      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style;
      var cls = "rdp__month-container ".concat(className);
      return _react["default"].createElement("div", {
        className: cls,
        style: style
      }, _react["default"].createElement(_CalendarHeader["default"], {
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick,
        date: date
      }), _react["default"].createElement(_MonthBody["default"], {
        onMonthClick: this.onMonthClick,
        month: date.format('M'),
        defaultValue: (0, _moment["default"])()
      }));
    }
  }]);

  return MonthPicker;
}(_react["default"].Component);

MonthPicker.propTypes = {
  defaultValue: _propTypes["default"].shape(),
  style: _propTypes["default"].shape(),
  onMonthChange: _propTypes["default"].func,
  className: _propTypes["default"].string
};
MonthPicker.defaultProps = {
  defaultValue: (0, _moment["default"])(),
  style: {},
  onMonthChange: _helper.noop,
  className: ''
};

var _default = (0, _EnhanceIntlProvider["default"])(MonthPicker);

exports["default"] = _default;