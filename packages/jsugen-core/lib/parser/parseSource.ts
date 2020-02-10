import requireFromString from 'require-from-string';
import { ParseSourceError } from '../errors';
import { transformToJavascript } from './internals';

/**
 * Parses the specified source file to a JS module format that can be processed
 * to convert its content to the data structures defined by generator packages.
 *
 * Notes:
 * - Source file parsing does currently build on Webpack loaders which
 *   provide a vast amount of pluggable source formats. This is however an
 *   open design decision and may be refactored to tools or custom scripting.
 *
 * @param sourceFile absolute path to source file
 */
export async function parseSource(sourceFile: string) {
  try {
    const source = await transformToJavascript(sourceFile);

    return requireFromString(source);
  } catch (error) {
    throw new ParseSourceError(sourceFile, error);
  }
}
