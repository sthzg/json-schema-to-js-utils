/* eslint-disable no-console */
import { isFunction, noop } from 'lodash';

export function log(...args) {
  return console.log(...args);
}

export function logError(...args) {
  return console.error(...args);
}

export function logIf(predicate) {
  const shouldLog = isFunction(predicate) ? predicate() : Boolean(predicate);

  return shouldLog ? (...args) => log(...args) : noop;
}
