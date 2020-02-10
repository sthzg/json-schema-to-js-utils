import { first, get, last } from 'lodash';
import { JsonSchemaWalkerChunk } from '../types';
import { minusOne } from '../../../utils';
import { PathNode } from '../../../types';

// ---
// By Chunk.
// ---
export function byChunkRootMemberName(chunk: JsonSchemaWalkerChunk) {
  const { pathToParent, path } = chunk;
  const [, rootMember] = [...pathToParent, ...path];

  return rootMember;
}

export function byChunkSchema(chunk: JsonSchemaWalkerChunk) {
  return get(chunk, 'schema');
}

export function byChunkHasJsonSchemaDefinition(chunk: JsonSchemaWalkerChunk) {
  return !!chunk.schema;
}

export const byChunkStartsWithPropertiesKeyword = (
  chunk: JsonSchemaWalkerChunk,
) => {
  const { pathToParent, path } = chunk;

  return first([...pathToParent, ...path]) === 'properties';
};

export function byChunkMemberName(chunk: JsonSchemaWalkerChunk) {
  return last(get(chunk, 'path'));
}

export function byChunkSchemaType(chunk: JsonSchemaWalkerChunk) {
  return get(byChunkSchema(chunk), 'type');
}

export function byChunkSchemaEnum(chunk: JsonSchemaWalkerChunk) {
  return get(byChunkSchema(chunk), 'enum');
}

// ---
// By PathNode.
// ---
export function byChunksIsIntermediaryArrayType(
  pathNodes: Array<PathNode>,
  index: number,
) {
  const member = get(pathNodes, [index, 'member']);
  const previousType = get(pathNodes, [minusOne(index), 'type']);

  const doesMatchKeyword = ['items', 'contains'].includes(member);
  const isParentArrayType = previousType === 'array';

  return doesMatchKeyword && isParentArrayType;
}

