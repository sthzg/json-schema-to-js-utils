import { constant } from 'lodash';
import { byIsLeaf, byPathNodeIsArray } from '../../../selectors';
import { buildArgName } from './buildArgName';

/**
 * Checks whether `pathNodes` contains array elements and returns an array
 * of array selector argument names (used in path or selector functions).
 */
export function buildArgNames(pathNodes, options = {}) {
  const { includeNth = false } = options;

  const maybeRejectLastElement = includeNth
    ? constant(true)
    : pathNode => !byIsLeaf(pathNode, pathNodes);

  const toArgNameForMember = ({ member }) => buildArgName(member);

  return pathNodes
    .filter(maybeRejectLastElement)
    .filter(byPathNodeIsArray)
    .map(toArgNameForMember);
}
