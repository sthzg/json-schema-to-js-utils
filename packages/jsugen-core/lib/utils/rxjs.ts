import { toArray } from 'rxjs/operators';

/**
 * Emits all values from a group operator as single array.
 */
export function $reduceGroupToArray(group) {
  return group.pipe(toArray());
}
