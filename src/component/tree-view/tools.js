/**
 * Created by zonebond on 2017/5/7.
 */

export const isArray = value => value && typeof value.slice === 'function' ? true : false;

export const asProps = (asset, props, every) => Object.keys(asset).reduce((acc, prop) => {
  acc[prop] = typeof every === 'function' ? every(prop, props[prop]) : props[prop];
  return acc;
}, {});

export const isFunc = value => typeof value === 'function' ? true : false;