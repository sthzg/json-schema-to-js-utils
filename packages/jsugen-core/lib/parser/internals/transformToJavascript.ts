import webpack, { Stats } from 'webpack';
import { buildWebpackConfig } from './buildWebpackConfig';
import { readFileFromStats } from './readFileFromStats';

/**
 * Compiles `sourceFile` to the Javascript module format.
 *
 * @param sourceFile absolute path to source file
 */
export async function transformToJavascript(
  sourceFile: string,
): Promise<string> {
  const config = buildWebpackConfig(sourceFile);

  return new Promise((resolve, reject) => {
    webpack(config, (error: Error, stats: Stats) => {
      if (error) {
        return reject(error);
      }

      if (stats.hasErrors()) {
        return reject(stats.toJson().errors);
      }

      return resolve(readFileFromStats(stats));
    });
  });
}
