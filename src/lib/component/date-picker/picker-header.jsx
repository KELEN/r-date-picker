import React from 'react';
import PropTypes from 'prop-types';
import {
  prefixClassObject,
} from '@/utils/style';
import {
  ARROW_PREV,
  ARROW_NEXT,
} from '@/utils/constants';

const PickerHeader = React.memo((props) => {
  const {
    className,
    onNavClick,
    children,
    prevButton,
    nextButton,
    style,
  } = props;

  return (
    <div className={className} style={style}>
      { children }
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-prev': true,
        })}
        onClick={() => {
          onNavClick(ARROW_PREV);
        }}
      >
        { prevButton }
      </span>
      <span
        aria-hidden="true"
        className={prefixClassObject({
          'nav-button': true,
          'nav-button-next': true,
        })}
        onClick={() => {
          onNavClick(ARROW_NEXT);
        }}
      >
        { nextButton }
      </span>
    </div>
  );
});

PickerHeader.displayName = 'PickerHeader';

PickerHeader.propTypes = {
  onNavClick: PropTypes.func,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  // 方向按钮
  prevButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  nextButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  // 内联样式
  style: PropTypes.shape(),
};

PickerHeader.defaultProps = {
  onNavClick: null,
  className: '',
  prevButton: 'prev',
  nextButton: 'next',
  style: {},
};

export default PickerHeader;
