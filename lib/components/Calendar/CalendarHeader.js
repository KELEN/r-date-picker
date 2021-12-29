"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = _interopRequireDefault(require("classname"));

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
      renderNextBtn = props.renderNextBtn;
  var prevBtncls = (0, _classname["default"])({
    'rdp__prev-btn': true,
    'rdp--hidden': hidePrevBtn
  });
  var nextBtnCls = (0, _classname["default"])({
    'rdp__next-btn': true,
    'rdp--hidden': hideNextBtn
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "rdp__title"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: prevBtncls,
    onClick: onPrevClick
  }, renderPrevBtn && renderPrevBtn()), /*#__PURE__*/_react["default"].createElement("span", {
    className: "rdp__title-center"
  }, props.children), /*#__PURE__*/_react["default"].createElement("span", {
    className: nextBtnCls,
    onClick: onNextClick
  }, renderNextBtn && renderNextBtn()));
};

var propTypes = {
  hidePrevBtn: _propTypes["default"].bool.isRequired,
  hideNextBtn: _propTypes["default"].bool.isRequired,
  onPrevClick: _propTypes["default"].func,
  onNextClick: _propTypes["default"].func,
  renderPrevBtn: _propTypes["default"].func,
  renderNextBtn: _propTypes["default"].func
};
var defaultProps = {
  hidePrevBtn: false,
  hideNextBtn: false
};
CalendarHeader.propTypes = propTypes;
CalendarHeader.defaultProps = defaultProps;
var _default = CalendarHeader;
exports["default"] = _default;