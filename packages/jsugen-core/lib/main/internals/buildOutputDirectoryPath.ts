import path from 'path';
import { endsWith, last } from 'lodash';
import { toUpperFirstCamelCase } from '../../utils';
import { BASEDIR_SOURCE_FILE_TOKEN, EMPTY_STRING } from '../../constants';
import { Context, maybeString } from "../../types";

const WILDCARD = '*.';

const byLastPatternSegment = (pattern: string): maybeString =>
  last(pattern.split(path.sep));

const byIncludesWildcard = (pattern: string): boolean =>
  pattern.includes(WILDCARD);

const byEndsWithPlainExtension = (pattern: string): boolean =>
  /\.[a-z]*$/i.test(pattern);

const stripWildcard = (pattern: string): string =>
  pattern.replace(WILDCARD, EMPTY_STRING);

const sortByStringLengthDesc = (a: string, b: string): number =>
  b.length - a.length;

/**
 * Returns the output directory path based on the configured settings.
 *
 * Currently supported mode tokens:
 * - <sourceFile>
 *   if the definition config contains a `<sourceFile>` token, the output file
 *   should be written relative to the source file by the path configured after
 *   that token, e.g. `<sourceFile>./../models`.
 *
 * If no mode token is present the configured path is resolved statically.
 */
export function buildOutputDirectoryPath(context: Context): string {
  const {
    data: {
      definition: {
        files: filePatterns,
        output: { baseDirectory },
      },
      sourceFile,
    },
  } = context;

  const isRelativeMode = baseDirectory.includes(BASEDIR_SOURCE_FILE_TOKEN);

  const directory = !isRelativeMode
    ? baseDirectory
    : path.join(
        path.dirname(sourceFile),
        <string>last(baseDirectory.split(BASEDIR_SOURCE_FILE_TOKEN)),
      );

  const sortedFilenamePatterns = filePatterns
    .map(byLastPatternSegment)
    .filter(byEndsWithPlainExtension)
    .filter(byIncludesWildcard)
    .map(stripWildcard)
    .sort(sortByStringLengthDesc);

  const filename = path.basename(sourceFile);
  const match = sortedFilenamePatterns.find((pattern: string) =>
    endsWith(filename, pattern),
  );

  const modelDirectory = toUpperFirstCamelCase(
    match
      ? filename.replace(`.${match}`, EMPTY_STRING)
      : path.basename(sourceFile, path.extname(sourceFile)),
  );

  return path.join(directory, modelDirectory);
}
