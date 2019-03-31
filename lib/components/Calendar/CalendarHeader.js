"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _reactIntl = require("react-intl");

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

var CalendarHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarHeader, _React$Component);

  function CalendarHeader(props) {
    _classCallCheck(this, CalendarHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(CalendarHeader).call(this, props));
  }

  _createClass(CalendarHeader, [{
    key: "intlTitleFormat",
    value: function intlTitleFormat(date) {
      return date.format('YYYYMMDD'); //date.format(`YYYY${ formatMessage({ id: "year", defaultMessage: '-' }) }MM${ formatMessage({ id: "month", defaultMessage: '' }) }DD${ formatMessage({ id: 'day', defaultMessage: '-' }) }`)
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onPrevClick = _this$props.onPrevClick,
          onNextClick = _this$props.onNextClick,
          hideNextBtn = _this$props.hideNextBtn,
          hidePrevBtn = _this$props.hidePrevBtn,
          renderPrevBtn = _this$props.renderPrevBtn,
          renderNextBtn = _this$props.renderNextBtn,
          currentMonth = _this$props.currentMonth;
      var prevBtncls = (0, _classname.default)({
        'rdp__prev-btn': true,
        'rdp--hidden': hidePrevBtn
      });
      var nextBtnCls = (0, _classname.default)({
        'rdp__next-btn': true,
        'rdp--hidden': hideNextBtn
      });
      var year = currentMonth.get('year'),
          month = currentMonth.get('month') + 1;
      var TitleFormat = (0, _reactIntl.injectIntl)(function (_ref) {
        var year = _ref.year,
            month = _ref.month,
            day = _ref.day,
            intl = _ref.intl;
        return "".concat(year).concat(intl.formatMessage({
          id: 'year'
        })).concat(month).concat(intl.formatMessage({
          id: 'month'
        }));
      });
      return _react.default.createElement("div", {
        className: "rdp__title"
      }, _react.default.createElement("span", {
        className: prevBtncls,
        onClick: onPrevClick
      }, renderPrevBtn && renderPrevBtn()), _react.default.createElement("span", {
        className: "rdp__title-center"
      }, _react.default.createElement(TitleFormat, {
        year: year,
        month: month
      })), _react.default.createElement("span", {
        className: nextBtnCls,
        onClick: onNextClick
      }, renderNextBtn && renderNextBtn()));
    }
  }]);

  return CalendarHeader;
}(_react.default.Component);

var propTypes = {
  hidePrevBtn: _propTypes.default.bool.isRequired,
  hideNextBtn: _propTypes.default.bool.isRequired,
  onPrevClick: _propTypes.default.func.isRequired,
  onNextClick: _propTypes.default.func.isRequired,
  currentMonth: _propTypes.default.object.isRequired,
  renderPrevBtn: _propTypes.default.func,
  renderNextBtn: _propTypes.default.func
};
var defaultProps = {
  hidePrevBtn: false,
  hideNextBtn: false,
  currentMonth: _propTypes.default.object
};
CalendarHeader.propTypes = propTypes;
CalendarHeader.defaultProps = defaultProps;
var _default = CalendarHeader;
exports.default = _default;