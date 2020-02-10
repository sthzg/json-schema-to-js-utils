import { flatten } from 'lodash';
import glob from 'glob';
import { enrichInData } from '../../utils';
import { buildOutputFilename } from './buildOutputFilename';
import {
  byContextDataDefinitionFiles,
  byContextDataDefinitionGenerators,
  byContextDataDefinitionIgnore,
} from './selectors';
import { resolveGenerateFunction } from './resolveGenerateFunction';
import { buildOutputDirectoryPath } from './buildOutputDirectoryPath';
import { Context } from "../../types";

/**
 * Enriches context with an array of filenames matching the source file pattern.
 * @param {Context} context
 */
export function enrichDataWithListOfSourceFilePaths(context: Context): Context {
  const getListOfSourceFilePaths = (patterns: Array<string>) =>
    flatten(
      patterns.map(pattern =>
        glob.sync(pattern, {
          absolute: true,
          ignore: byContextDataDefinitionIgnore(context),
        }),
      ),
    );

  const patterns = byContextDataDefinitionFiles(context);

  return enrichInData(context, {
    sourceFiles: getListOfSourceFilePaths(patterns),
  });
}

/**
 * Enriches context with an array of references to the `generate` functions.
 * @param {Context} context
 */
export function enrichDataWithGenerateFunctions(context: Context): Context {
  const generatorsConfig = byContextDataDefinitionGenerators(context);
  const generateFunctions = generatorsConfig.map(resolveGenerateFunction);

  return enrichInData(context, { generateFunctions });
}

/**
 * Enriches context with `outputDirectory` and `outputFileName` information.
 * See docs at {@see buildOutputDirectoryPath} for more information.
 *
 * @param {Context} context
 */
export function enrichDataWithOutputPath(context: Context): Context {
  const outputDirectory = buildOutputDirectoryPath(context);
  const outputFilename = buildOutputFilename(context);

  return enrichInData(context, { outputDirectory, outputFilename });
}
