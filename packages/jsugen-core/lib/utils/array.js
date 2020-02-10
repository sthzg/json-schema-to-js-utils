import { castArray, merge, isEmpty, isString, isNumber } from 'lodash';
import { toUpperSnakeCase } from './format';

/**
 * Returns the result of `fn(...args)` if predicate is truthy or undefined.
 */
export function maybeItem(predicate, fn, ...args) {
  return predicate ? fn(...args) : undefined;
}

/**
 * Returns a key-value object with input array values as upper-snake-cased keys.
 */
export function arrayToEnum(array) {
  const isNonEmptyStringOrNumber = value =>
    (isString(value) && !isEmpty(value)) || isNumber(value);

  return castArray(array)
    .filter(isNonEmptyStringOrNumber)
    .reduce((result, value) => {
      const key = toUpperSnakeCase(value);

      return merge({}, result, { [key]: value });
    }, {});
}
