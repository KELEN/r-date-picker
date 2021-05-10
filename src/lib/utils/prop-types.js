import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// 日期类型
export const dateType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(dayjs),
]);

// children类型
export const childrenType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.string,
]).isRequired;