"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classname = _interopRequireDefault(require("classname"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var months = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

var MonthBody = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthBody, _React$Component);

  var _super = _createSuper(MonthBody);

  function MonthBody() {
    _classCallCheck(this, MonthBody);

    return _super.apply(this, arguments);
  }

  _createClass(MonthBody, [{
    key: "render",
    value: function render() {
      var _this = this;

      var month = this.props.month;

      var MonthRow = function MonthRow(props) {
        var nums = props.nums;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "rdp__months-row"
        }, nums.map(function (num) {
          var monthItemCls = (0, _classname["default"])({
            'rdp__months-item': true,
            'rdp__months-item-active': Number(month) === Number(num)
          });
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: num,
            className: monthItemCls,
            onClick: function onClick() {
              return _this.props.onMonthClick(num);
            }
          }, num);
        }));
      };

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rdp__months-body"
      }, months.map(function (nums, idx) {
        return /*#__PURE__*/_react["default"].createElement(MonthRow, {
          key: idx,
          nums: nums
        });
      }));
    }
  }]);

  return MonthBody;
}(_react["default"].Component);

MonthBody.propTypes = {
  month: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onMonthClick: _propTypes["default"].func
};
MonthBody.defaultProps = {
  onMonthClick: _helper.noop
};
var _default = MonthBody;
exports["default"] = _default;