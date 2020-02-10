import { EMPTY_STRING } from './constants';

/**
 * Supported module formats for generated source files.
 * If `cjs` is chosen it will be transpiled from `esm` with Babel.
 */
export const ModuleFormat = {
  CJS: 'cjs',
  ESM: 'esm',
};

/**
 * Enum of all the specified types in the Json schema specification:
 * https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1
 */
export const JsonSchemaTypes = {
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  NULL: 'null',
  ANY: 'any',
};

export const Encoding = {
  UTF8: 'utf8',
};

// ---
// Default Naming.
// ---
export const Prefix = {
  NONE: EMPTY_STRING,
  BY: 'by',
  DATA: 'data',
  TEMPLATE: 'template',
  GENERATE_MODULE_NAME: '@sthzg/jsugen-generate-',
};

export const Postfix = {
  NONE: EMPTY_STRING,
  INDEX: 'Index',
  NTH: 'Nth',
  PATH: 'Path',
  VALUES: 'Values',
};
