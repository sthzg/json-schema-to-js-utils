import camelCase from 'lodash/camelCase';
import flow from 'lodash/flow';
import upperFirst from 'lodash/upperFirst';
import toUpper from 'lodash/toUpper';
import snakeCase from 'lodash/snakeCase';
import { UNDERSCORE } from '../constants';

/**
 * Joins tokens by `joinChar` (default to truthy tokens by UNDERSCORE).
 *
 * @param tokens - array of strings to concatenate
 * @param joinChar - character to join by, defaults to UNDERSCORE
 * @param predicate - predicate fn to filter by, defaults to truthy values
 */
export function concat(
  tokens,
  { joinChar = UNDERSCORE, predicate = Boolean } = {},
) {
  return tokens.filter(predicate).join(joinChar);
}

/**
 * Transforms input strings to camel case with upper first char.
 */
export function toUpperFirstCamelCase(...tokens) {
  return flow(
    concat,
    camelCase,
    upperFirst,
  )(tokens);
}

/**
 * Transforms input strings to camel case.
 */
export function toCamelCase(...tokens) {
  return flow(
    concat,
    camelCase,
  )(tokens);
}

/**
 * Transforms input to upper snake case.
 * - fooBar -> FOO_BAR
 */
export function toUpperSnakeCase(...tokens) {
  return flow(
    concat,
    snakeCase,
    toUpper,
  )(tokens);
}

/**
 * Wraps input string with single quotes.
 * - foo => 'foo'
 */
export function wrapInSingleQuote(x) {
  return `'${x}'`;
}

/**
 * Wraps input string with an opening and closing curly brace.
 * - foo => { foo }
 */
export function wrapInCurlyBraces(x) {
  return `{ ${x} }`;
}

/**
 * Wraps input string with an opening and closing round bracket.
 * - foo => ( foo )
 */
export function wrapInRoundBrackets(x) {
  return `( ${x} )`;
}
