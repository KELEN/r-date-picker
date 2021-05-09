
import classNames from 'classnames';

const CSS_PREFIX = "rdp__";

const wrapCls = classNames({
  'rdp__calendar': true,
})

export const prefixClassObject = (cls = {}, prefix = CSS_PREFIX) =>{
  const keys = Object.keys(cls);

  return keys.reduce((prev, curr) => {
    prev[`${prefix}${curr}`] = cls[curr];
    return prev;
  }, {})
}

export const prefixClass = (cls = '', prefix = CSS_PREFIX) => {
  return `${prefix}${cls}`
}