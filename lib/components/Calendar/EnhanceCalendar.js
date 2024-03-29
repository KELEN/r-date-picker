"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

/**
 * EnhanceCalendar to handle select state
 * @param WrapComponent
 * @param options  range: if select range
 * @constructor
 */
var EnhanceCalendar = function EnhanceCalendar(WrapComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$range = options.range,
      range = _options$range === void 0 ? false : _options$range;
  return /*#__PURE__*/function (_React$Component) {
    _inherits(_class, _React$Component);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.call(this, props);
      var startDate, endDate;

      if (range && Array.isArray(props.defaultDate)) {
        // range date
        startDate = props.defaultDate[0];
        endDate = props.defaultDate[1];
      } else {
        startDate = props.defaultDate;
      }

      _this.state = {
        animating: false,
        startDate: startDate,
        endDate: endDate,
        hoveringDate: null
      };
      _this.onDateChange = _this.onDateChange.bind(_assertThisInitialized(_this));
      _this.onHoveringDateChange = _this.onHoveringDateChange.bind(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * hovering day item
     * @param {*} event
     * @param {*} date
     */


    _createClass(_class, [{
      key: "onHoveringDateChange",
      value: function onHoveringDateChange(date, event) {
        var _this$state = this.state,
            startDate = _this$state.startDate,
            endDate = _this$state.endDate,
            isHovering = _this$state.isHovering;
        var onHoveringDateChange = this.props.onHoveringDateChange;

        if (range && isHovering) {
          this.setState({
            hoveringDate: date
          });

          if (startDate && startDate.isAfter(date)) {
            this.setState({
              startDate: null,
              endDate: startDate
            });
          } else if (endDate && endDate.isBefore(date)) {
            this.setState({
              startDate: endDate,
              endDate: null
            });
          }
        }

        onHoveringDateChange && onHoveringDateChange(date, event);
      }
      /**
       * date change
       * @param {*} event
       * @param {*} date
       */

    }, {
      key: "onDateChange",
      value: function onDateChange(date, event) {
        var _this$state2 = this.state,
            startDate = _this$state2.startDate,
            endDate = _this$state2.endDate;
        var _this$props = this.props,
            onDateChange = _this$props.onDateChange,
            onDateRangeChange = _this$props.onDateRangeChange;

        if (range) {
          if (!startDate && !endDate) {
            this.setState({
              startDate: date,
              isHovering: true
            });
          } else if (!startDate) {
            this.setState({
              startDate: date,
              isHovering: !endDate
            });
            onDateRangeChange && onDateRangeChange([date, endDate]);
          } else if (!endDate) {
            if (date.isBefore(startDate)) {
              this.setState({
                startDate: date,
                endDate: startDate,
                isHovering: !startDate
              });
              onDateRangeChange && onDateRangeChange([date, startDate]);
            } else {
              this.setState({
                endDate: date,
                isHovering: !startDate
              });
              onDateRangeChange && onDateRangeChange([startDate, date]);
            }
          } else {
            this.setState({
              startDate: date,
              endDate: null,
              isHovering: true,
              hoveringDate: null
            });
          }
        } else {
          this.setState({
            startDate: date
          });
        }

        onDateChange && onDateChange(date, event);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(WrapComponent, _extends({}, this.props, this.state, {
          onDateChange: this.onDateChange,
          onHoveringDateChange: this.onHoveringDateChange
        }));
      }
    }]);

    return _class;
  }(_react["default"].Component);
};

var _default = EnhanceCalendar;
exports["default"] = _default;