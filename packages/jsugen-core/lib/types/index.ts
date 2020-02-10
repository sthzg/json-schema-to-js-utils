// ---
// Helpers.
// ---
export type maybeString = string | undefined;

// ---
// Config.
// ---
type ModuleFormat = 'cjs' | 'esm';

export type Definition = {
  files: Array<string>;
  generators: Array<string>;
  output: {
    baseDirectory: string;
  };
};

export type Config = {
  dryRun: boolean;
  silent: boolean;
  moduleFormat: ModuleFormat;
  definitions: Array<Definition>;
};

export type WriteConfig = {
  /**
   * Path to the output directory.
   */
  directory: string;

  /**
   * Filename for the generated module.
   */
  filename: string;

  /**
   * Defines the module format for the generated file.
   * Defaults to ESM, uses babel to transpile to CJS if defined.
   */
  moduleFormat: ModuleFormat;

  /**
   * File encoding.
   */
  encoding: string;

  /**
   * If true all modules will be written to stdout.
   */
  dryRun: boolean;

  /**
   * Skips logging to console if true.
   */
  silent: boolean;
};

// ---
// Context.
// ---
export type Context = {
  config: Config;
  data: any;
};

// ---
// GenerateFunction.
// ---
export type GenerateFunction = {
  moduleName: string;
  generateFunction?: Function;
};

/**
 * A data object containing values to describe each member in an object graph.
 *
 * It is the task of `source` packages to normalize different inputs like
 * JSONSchema, Javascript, XML, etc. into instances of `MemberDefinition` which
 * then act as interfaces to the `generator` packages to generate code.
 */
export interface MemberDefinition {
  id: string;
  pathNodes: Array<boolean>;
}

/**
 * A data object containing values to describe a member in an object graph.
 */
export interface PathNode {
  enumValues?: Array<string>;
  member: string;
  type: string;
}
