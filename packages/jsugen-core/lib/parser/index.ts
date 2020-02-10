/**
 * The parser modules are responsible for parsing source files of supported
 * formats (e.g. json schema, js, xml, css, etc.) into JS so that they can
 * be processed and transformed by the generators.
 *
 * Business logic like common processing for specific source formats is
 * separated to the `/lib/sources` directory.
 */
export { parseSource } from './parseSource';
