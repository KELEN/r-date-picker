import classNames from 'classnames';

const CSS_PREFIX = 'rdp__';

export const prefixClassObject = (cls = {}, prefix = CSS_PREFIX) => {
  const keys = Object.keys(cls);

  return classNames(keys.reduce((prev, curr) => {
    prev[`${prefix}${curr}`] = cls[curr];
    return prev;
  }, {}));
};

export const prefixClass = (cls = '', prefix = CSS_PREFIX) => `${prefix}${cls}`;
