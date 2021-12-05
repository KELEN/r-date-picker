"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/**
 * month picker
 */
var MonthPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthPicker, _React$Component);

  var _super = _createSuper(MonthPicker);

  function MonthPicker(props) {
    var _this;

    _classCallCheck(this, MonthPicker);

    _this = _super.call(this, props);

    _this.onPrevClick = function () {
      _this.setState({
        defaultValue: _this.state.defaultValue.subtract(1, 'year')
      });
    };

    _this.onNextClick = function () {
      _this.setState({
        defaultValue: _this.state.defaultValue.add(1, 'year')
      });
    };

    _this.onMonthClick = function (num) {
      var onMonthChange = _this.props.onMonthChange;
      var newDate = (0, _moment["default"])({
        y: _this.state.defaultValue.format('YYYY'),
        M: num - 1,
        d: _this.props.defaultValue.format('D')
      });

      _this.setState({
        defaultValue: newDate
      });

      onMonthChange(newDate);
    };

    _this.state = {
      defaultValue: props.defaultValue
    };
    return _this;
  }

  _createClass(MonthPicker, [{
    key: "render",
    value: function render() {
      var defaultValue = this.state.defaultValue;
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          minDate = _this$props.minDate;
      var cls = "rdp__month-container ".concat(className);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: cls,
        style: style
      }, /*#__PURE__*/_react["default"].createElement(_CalendarHeader["default"], {
        onPrevClick: this.onPrevClick,
        onNextClick: this.onNextClick
      }, defaultValue.format('YYYY')), /*#__PURE__*/_react["default"].createElement(_MonthBody["default"], {
        minDate: minDate,
        onMonthClick: this.onMonthClick,
        month: defaultValue.format('M')
      }));
    }
  }]);

  return MonthPicker;
}(_react["default"].Component);

MonthPicker.propTypes = {
  minDate: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(_moment["default"])]),
  defaultValue: _propTypes["default"].object,
  onMonthChange: _propTypes["default"].func
};
MonthPicker.defaultProps = {
  minDate: null,
  defaultValue: (0, _moment["default"])(),
  onMonthChange: _helper.noop
};
var _default = MonthPicker;
exports["default"] = _default;