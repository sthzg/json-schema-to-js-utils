import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export interface JsonSchemaWalkerChunk {
  schema: {};
  path: Array<string>;
  parent: {};
  pathToParent: Array<string>;
  fullPath: Array<string>;
}

export interface IntermediaryNode {
  index: number;
  enumValues: Array<string> | undefined;
}

export interface JsonSchemaNode {
  additionalProperties?: boolean;
  type?: string;
  enum?: Array<string>;
  items?: JsonSchemaNode;
}

export type JsonSchemaAny = JSONSchema4 | JSONSchema6 | JSONSchema7;
