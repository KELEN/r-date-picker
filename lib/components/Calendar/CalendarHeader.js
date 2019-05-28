"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function intlTitleFormat(date) {
  return date.format('YYYYMMDD'); //date.format(`YYYY${ formatMessage({ id: "year", defaultMessage: '-' }) }MM${ formatMessage({ id: "month", defaultMessage: '' }) }DD${ formatMessage({ id: 'day', defaultMessage: '-' }) }`)
}

var CalendarHeader = function CalendarHeader(props) {
  var onPrevClick = props.onPrevClick,
      onNextClick = props.onNextClick,
      hideNextBtn = props.hideNextBtn,
      hidePrevBtn = props.hidePrevBtn,
      renderPrevBtn = props.renderPrevBtn,
      renderNextBtn = props.renderNextBtn,
      currentMonth = props.currentMonth;
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
};

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