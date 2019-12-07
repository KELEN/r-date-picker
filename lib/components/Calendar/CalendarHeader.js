"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Calendar Header
 * @param {*} props
 */
var CalendarHeader = function CalendarHeader(props) {
  var onPrevClick = props.onPrevClick,
      onNextClick = props.onNextClick,
      hideNextBtn = props.hideNextBtn,
      hidePrevBtn = props.hidePrevBtn,
      renderPrevBtn = props.renderPrevBtn,
      renderNextBtn = props.renderNextBtn,
      messages = props.intl.messages,
      date = props.date,
      onHeaderClick = props.onHeaderClick;
  var prevBtncls = (0, _classname["default"])({
    'rdp__prev-btn': true,
    'rdp--hidden': hidePrevBtn
  });
  var nextBtnCls = (0, _classname["default"])({
    'rdp__next-btn': true,
    'rdp--hidden': hideNextBtn
  });
  var year = date.get('year');
  var month = date.get('month') + 1;
  return _react["default"].createElement("div", {
    className: "rdp__title"
  }, _react["default"].createElement("span", {
    className: prevBtncls,
    onClick: onPrevClick
  }, renderPrevBtn && renderPrevBtn()), _react["default"].createElement("span", {
    className: "rdp__title-center"
  }, _react["default"].createElement("span", {
    onClick: onHeaderClick
  }, "".concat(year).concat(messages.year).concat(month).concat(messages.month))), _react["default"].createElement("span", {
    className: nextBtnCls,
    onClick: onNextClick
  }, renderNextBtn && renderNextBtn()));
};

CalendarHeader.propTypes = {
  hidePrevBtn: _propTypes["default"].bool,
  hideNextBtn: _propTypes["default"].bool,
  onPrevClick: _propTypes["default"].func,
  onNextClick: _propTypes["default"].func,
  renderPrevBtn: _propTypes["default"].func,
  renderNextBtn: _propTypes["default"].func,
  intl: _propTypes["default"].shape().isRequired,
  date: _propTypes["default"].shape().isRequired,
  onHeaderClick: _propTypes["default"].func
};
CalendarHeader.defaultProps = {
  hidePrevBtn: false,
  hideNextBtn: false
};

var _default = (0, _reactIntl.injectIntl)(CalendarHeader);

exports["default"] = _default;