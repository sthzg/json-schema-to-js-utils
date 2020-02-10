import { get } from 'lodash';
import { byPathNodesIsEnumLeaf, byPathNodesLastMember } from './pathNodes';

export function byMemberDefinitionId(memberDefinition) {
  return get(memberDefinition, 'id');
}

export function byMemberDefinitionIsEnum(memberDefinition) {
  const { pathNodes } = memberDefinition;

  return byPathNodesIsEnumLeaf(pathNodes);
}

export function byMemberDefinitionPathNodes(memberDefinition) {
  return get(memberDefinition, 'pathNodes');
}

export function byMemberDefinitionMemberName(memberDefinition) {
  return byPathNodesLastMember(byMemberDefinitionPathNodes(memberDefinition));
}
