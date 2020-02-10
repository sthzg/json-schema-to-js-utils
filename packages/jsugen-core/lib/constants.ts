/**
 * Default options to invoke prettier.format with.
 */
export const DEFAULT_PRETTIER_OPTIONS = {
  parser: 'babel',
  singleQuote: true,
  printWidth: 80,
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
};

/**
 * Default import for a lodash compatible get function.
 * config.imports.lodashGet = 'import { get } from 'lodash';'
 *
 * Configurable in .jsugen.config.js
 */
export const DEFAULT_GET_IMPORT = `import get from 'lodash/get';`;

/**
 * Default file docstring.
 * TODO: make configurable through an option.
 */
export const DEFAULT_FILE_DOCSTRING = `
/**
 * @file This file is auto-generated. Do not modify its contents manually.
 */
`;

/**
 * Banner logged to console if dry run mode is active.
 */
export const DRY_RUN_BANNER = `
********************
*** Dry run mode ***
********************
`;

// ---
// Config Constants.
// ---
export const BASEDIR_SOURCE_FILE_TOKEN = '<sourceFile>';

// ---
// Semantic Constants.
// ---
export const COMMA = ',';
export const DOT = '.';
export const EMPTY_STRING = '';
export const NEWLINE = '\n';
export const SPACE = ' ';
export const UNDERSCORE = '_';
