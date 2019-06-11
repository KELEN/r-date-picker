"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _CalendarHeader = _interopRequireDefault(require("../Calendar/CalendarHeader"));

var _MonthBody = _interopRequireDefault(require("./MonthBody"));

var _helper = require("../../utils/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    _this.state = {
      defaultValue: props.defaultValue
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: "onPrevClick",
    value: function onPrevClick() {
      this.setState({
        defaultValue: this.state.defaultValue.subtract(1, 'year')
      });
    }
  }, {
    key: "onNextClick",
    value: function onNextClick() {
      this.setState({
        defaultValue: this.state.defaultValue.add(1, 'year')
      });
    }
  }, {
    key: "onMonthClick",
    value: function onMonthClick(num) {
      var onMonthChange = this.props.onMonthChange;
      var newDate = (0, _moment.default)({
        y: this.state.defaultValue.format('YYYY'),
        M: num - 1,
        d: this.props.defaultValue.format('D')
      });
      this.setState({
        defaultValue: newDate
      });
      onMonthChange(newDate);
    }
  }, {
    key: "render",
    value: function render() {
      var defaultValue = this.state.defaultValue;
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style;
      var cls = "rdp__month-container ".concat(className);
      return _react.default.createElement("div", {
        className: cls,
        style: style
      }, _react.default.createElement(_CalendarHeader.default, {
        onPrevClick: this.onPrevClick.bind(this),
        onNextClick: this.onNextClick.bind(this)
      }, defaultValue.format('YYYY')), _react.default.createElement(_MonthBody.default, {
        onMonthClick: this.onMonthClick.bind(this),
        month: defaultValue.format('M')
      }));
    }
  }]);

  return MonthPicker;
}(_react.default.Component);

MonthPicker.propTypes = {
  defaultValue: _propTypes.default.object,
  onMonthChange: _propTypes.default.func
};
MonthPicker.defaultProps = {
  defaultValue: (0, _moment.default)(),
  onMonthChange: _helper.noop
};
var _default = MonthPicker;
exports.default = _default;