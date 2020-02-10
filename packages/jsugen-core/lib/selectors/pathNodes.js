import { get, isEqual, last } from 'lodash';
import { JsonSchemaTypes } from '../enums';

// ---
// Mixed.
// ---
export function byIsLeaf(pathNode, pathNodes) {
  return isEqual(pathNode, last(pathNodes));
}

// ---
// Path Nodes Array.
// ---
export function byPathNodesIsArrayLeaf(pathNodes) {
  const { type: leafType } = last(pathNodes);

  return isEqual(leafType, JsonSchemaTypes.ARRAY);
}

export function byPathNodesIsEnumLeaf(pathNodes) {
  const { enumValues: leafEnumValues } = last(pathNodes);

  return Boolean(leafEnumValues);
}

export function byPathNodesEnumValues(pathNodes) {
  return get(last(pathNodes), 'enumValues');
}

export function byPathNodesLastMember(pathNodes) {
  return byPathNodeMember(last(pathNodes));
}

// ---
// Path Node Instance.
// ---
export function byPathNodeIsEnum(pathNode) {
  return Boolean(get(pathNode, 'enumValues'));
}

export function byPathNodeMember(pathNode) {
  return get(pathNode, 'member');
}

export function byPathNodeType(pathNode) {
  return get(pathNode, 'type');
}

export function byPathNodeIsArray(pathNode) {
  return isEqual(byPathNodeType(pathNode), JsonSchemaTypes.ARRAY);
}
