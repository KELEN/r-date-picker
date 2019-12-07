"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * EnhanceCalendar
 * 处理选择的日期
 * @param WrapComponent
 * @param options  range: 是否选择时间范围
 * @constructor
 */
var EnhanceCalendar = function EnhanceCalendar(WrapComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$range = options.range,
      range = _options$range === void 0 ? false : _options$range;

  var MComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MComponent, _React$Component);

    function MComponent(props) {
      var _this;

      _classCallCheck(this, MComponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MComponent).call(this, props));

      _this.onHoveringDateChange = function (date) {
        var _this$state = _this.state,
            startDate = _this$state.startDate,
            endDate = _this$state.endDate,
            isHovering = _this$state.isHovering;
        var onHoveringDateChange = _this.props.onHoveringDateChange;

        if (range && isHovering) {
          _this.setState({
            hoveringDate: date
          });

          if (startDate && startDate.isAfter(date)) {
            _this.setState({
              startDate: null,
              endDate: startDate
            });
          } else if (endDate && endDate.isBefore(date)) {
            _this.setState({
              startDate: endDate,
              endDate: null
            });
          }
        }

        if (typeof onHoveringDateChange === 'function') {
          onHoveringDateChange(date);
        }
      };

      _this.onDateChange = function (date) {
        var _this$state2 = _this.state,
            startDate = _this$state2.startDate,
            endDate = _this$state2.endDate;
        var _this$props = _this.props,
            onDateChange = _this$props.onDateChange,
            onDateRangeChange = _this$props.onDateRangeChange;

        if (range) {
          if (!startDate && !endDate) {
            _this.setState({
              startDate: date,
              isHovering: true
            });
          } else if (!startDate) {
            _this.setState({
              startDate: date,
              isHovering: !endDate
            });

            if (typeof onDateRangeChange === 'function') {
              onDateRangeChange([date, endDate]);
            }
          } else if (!endDate) {
            if (date.isBefore(startDate)) {
              _this.setState({
                startDate: date,
                endDate: startDate,
                isHovering: !startDate
              });

              if (typeof onDateRangeChange === 'function') {
                onDateRangeChange([date, startDate]);
              }
            } else {
              _this.setState({
                endDate: date,
                isHovering: !startDate
              });

              if (typeof onDateRangeChange === 'function') {
                onDateRangeChange([startDate, date]);
              }
            }
          } else {
            _this.setState({
              startDate: date,
              endDate: null,
              isHovering: true,
              hoveringDate: null
            });
          }
        } else {
          _this.setState({
            startDate: date
          });
        }

        if (typeof onDateChange === 'function') {
          onDateChange(date);
        }
      };

      var _startDate;

      var _endDate;

      var defaultDate = props.defaultDate;

      if (range && Array.isArray(defaultDate)) {
        // 时间范围
        var _defaultDate = _slicedToArray(defaultDate, 2);

        _startDate = _defaultDate[0];
        _endDate = _defaultDate[1];
      } else {
        _startDate = defaultDate;
      }

      _this.state = {
        animating: false,
        startDate: _startDate,
        endDate: _endDate,
        hoveringDate: null
      };
      return _this;
    }
    /**
     * hovering day item
     * @param {*} event
     * @param {*} date
     */


    _createClass(MComponent, [{
      key: "render",
      value: function render() {
        return _react["default"].createElement(WrapComponent, _extends({
          onDateChange: this.onDateChange,
          onHoveringDateChange: this.onHoveringDateChange
        }, this.state, this.props));
      }
    }]);

    return MComponent;
  }(_react["default"].Component);

  MComponent.propTypes = {
    defaultDate: _propTypes["default"].oneOfType([_propTypes["default"].shape(), _propTypes["default"].arrayOf()]),
    onHoveringDateChange: _propTypes["default"].func,
    onDateChange: _propTypes["default"].func,
    onDateRangeChange: _propTypes["default"].func
  };
  return MComponent;
};

var _default = EnhanceCalendar;
exports["default"] = _default;