"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render calendar labels
 * @param {*} props 
 */
var CalendarLabel = function CalendarLabel(props) {
  var labels = props.labels;
  return _react.default.createElement("div", {
    className: "rdp__labels"
  }, labels.map(function (item, idx) {
    return _react.default.createElement("div", {
      className: "rdp__labels-item",
      key: idx
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: item
    }));
  }));
};

CalendarLabel.propTypes = {
  labels: _propTypes.default.array
};
var _default = CalendarLabel;
exports.default = _default;