import fs from 'fs';
import os from 'os';
import path from 'path';
import { Configuration } from 'webpack';
import { UNDERSCORE } from '../../constants';

/**
 * Builds a Webpack configuration to compile `sourceFile` into a JS module.
 *
 * @param sourceFile absolute path to source file
 * @param options options object to modify and extend configured loaders
 */
export function buildWebpackConfig(
  sourceFile: string,
  options = {},
): Configuration {
  const entryKey = byEntryKey(sourceFile);
  const babelLoaderConfig = byBabelLoaderConfig(options);

  /**
   * Returns array of paths to existing parent node_modules directories. This
   * ensures that the Webpack loaders can be resolved when the CLI is installed
   * globally or ran through NPX.
   *
   * TODO: are there nicer ways to achieve this?
   */
  const ensureResolverLookupOnGlobalInstall = (
    lookupDir: string,
    hits: Array<string> = [],
  ): Array<string> => {
    const isRoot = path.parse(lookupDir).root === lookupDir;
    const maybeHit = path.join(lookupDir, 'node_modules');

    if (fs.existsSync(maybeHit)) {
      hits.push(maybeHit);
    }

    return isRoot
      ? hits
      : ensureResolverLookupOnGlobalInstall(
          path.dirname(lookupDir),
          hits,
        );
  };

  return {
    mode: 'production',
    target: 'node',
    cache: false,
    entry: {
      [entryKey]: sourceFile,
    },
    output: {
      filename: '[name].[hash].js',
      libraryTarget: 'commonjs2',
      path: path.join(os.tmpdir(), 'jsugen/sources'),
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          type: 'javascript/auto',
          loader: 'json5-loader',
        },
        {
          test: /\.json5$/,
          loader: 'json5-loader',
        },
        {
          test: /\.m?js$/,
          use: babelLoaderConfig,
        },
      ],
    },
    resolveLoader: {
      modules: [
        ...ensureResolverLookupOnGlobalInstall(__dirname),
        './node_modules/@sthzg/jsugen-core/node_modules',
        'node_modules',
      ],
    },
  };
}

/**
 * @private Returns a unique key name for the processed source file.
 *
 * @param sourceFile Absolute path to the entry point.
 */
function byEntryKey(sourceFile: string) {
  return path
    .dirname(sourceFile)
    .split(path.sep)
    .join(UNDERSCORE)
    .toLowerCase();
}

/**
 * @private Returns the babel loader configuration object.
 *
 * @param options.babelConfigPath
 *        The absolute file path to a custom babel configuration file. Can
 *        be passed by the user to inject their project's Babel settings
 *        over the defaults.
 */
function byBabelLoaderConfig(options: { babelConfigPath?: string }) {
  const { babelConfigPath } = options;

  const queryOrOptions = babelConfigPath
    ? { query: { extends: babelConfigPath } }
    : {
        options: {
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-export-default-from',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-transform-modules-commonjs',
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
          ],
        },
      };

  return {
    loader: 'babel-loader',
    ...queryOrOptions,
  };
}
