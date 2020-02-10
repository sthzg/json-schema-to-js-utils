import { flatten } from 'lodash';
import { maybeItem } from '../../../utils';
import {
  byIsLeaf,
  byPathNodeIsArray,
  byPathNodeIsEnum,
} from '../../../selectors';
import { buildArgName } from './buildArgName';

export function buildObjectPathArray(pathNodes, options = {}) {
  const { includeNth = false } = options;

  const byShouldAddNthPath = pathNode => {
    const isArrayType = byPathNodeIsArray(pathNode);
    const isEnum = byPathNodeIsEnum(pathNode);
    const isLeaf = byIsLeaf(pathNode, pathNodes);

    return isArrayType && !isEnum && (!isLeaf || includeNth);
  };

  return flatten(
    pathNodes.map(pathNode => {
      const { member } = pathNode;

      return [
        member,
        maybeItem(byShouldAddNthPath(pathNode), buildArgName, member),
      ].filter(Boolean);
    }),
  );
}
