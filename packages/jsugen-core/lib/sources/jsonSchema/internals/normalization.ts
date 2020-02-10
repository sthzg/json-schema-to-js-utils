import { isEmpty, isEqual } from 'lodash';
import { DOT } from '../../../constants';
import { minusOne } from '../../../utils';
import {
  byChunkMemberName,
  byChunkSchemaEnum,
  byChunkSchemaType,
  byChunksIsIntermediaryArrayType,
} from './selectors';
import { IntermediaryNode } from '../types';
import { MemberDefinition, PathNode } from '../../../types';

/**
 *
 * @param pathNodes
 */
export function buildId(pathNodes: Array<PathNode>) {
  return pathNodes.map(pathNode => pathNode.member).join(DOT);
}

/**
 *
 * @param pathNodes
 */
export function buildIntermediaryNodes(pathNodes: Array<PathNode>): Array<IntermediaryNode> {
  return pathNodes.reduce((result, item, index) => {
    return byChunksIsIntermediaryArrayType(pathNodes, index)
      ? [...result, { index, enumValues: item.enumValues }]
      : result;
  }, []);
}

/**
 *
 * @param pathNodes
 * @param intermediaryNodes
 */
export function buildPathNodes(
  pathNodes: Array<PathNode>,
  intermediaryNodes: Array<IntermediaryNode>,
): Array<PathNode> {
  return pathNodes
    .map((pathNode, index) => {
      const match = intermediaryNodes.find(needle => index === minusOne(needle.index));

      return match
        ? {
            ...pathNode,
            enumValues: match.enumValues,
          }
        : pathNode;
    })
    .filter((_, index) => !byChunksIsIntermediaryArrayType(pathNodes, index));
}

/**
 *
 * @param branches
 */
export function toMemberDefinitions(branches): Array<MemberDefinition> {
  const toPathNodesArray = toPathNodesArrayFactory(branches);

  return branches.map(pathNode => {
    const allNodes = toPathNodesArray(pathNode);
    const intermediaryNodes = buildIntermediaryNodes(allNodes);
    const pathNodes = buildPathNodes(allNodes, intermediaryNodes);
    const id = buildId(pathNodes);

    return {
      id,
      pathNodes,
    };
  });
}

/**
 * Reduces each leaf member to an array of `PathNode` elements.
 */
export function toPathNodesArrayFactory(branches) {
  const byParent = node => {
    return branches.find(needle => isEqual(needle.fullPath, node.pathToParent));
  };

  return function toPathNodesArray(current, result = []) {
    const nextResult = [
      new PathNode({
        enumValues: byChunkSchemaEnum(current),
        type: byChunkSchemaType(current),
        member: byChunkMemberName(current),
      }),
      ...result,
    ];

    return isEmpty(current.pathToParent)
      ? nextResult
      : toPathNodesArray(byParent(current), nextResult);
  };
}
