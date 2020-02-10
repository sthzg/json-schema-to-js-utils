import path from 'path';
import fs from 'fs-extra';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { castArray, isEmpty } from 'lodash';
import { DRY_RUN_BANNER } from '../constants';
import { logIf } from '../utils/log';
import { withPrependToString } from '../utils';
import { withApplyModuleFormat } from './withApplyModuleFormat';
import { withPrettier } from './withPrettier';

/**
 * HOF returning an observable that prettifies and writes the generated content.
 * If no content is generated this is a noop that logs to console if not silent.
 *
 * @param writeConfig
 * @param prettierConfig
 * @param headers
 * @param id
 * @return {function(*=): Observable<any>}
 */
export function withWrite({ writeConfig, prettierConfig, headers, id }) {
  return content =>
    isEmpty(content)
      ? fromNoContent(writeConfig, id)
      : fromContent(content, { writeConfig, prettierConfig, headers });
}

/**
 * @private Returns observable that performs writing tasks.
 *
 * @param content
 * @param writeConfig
 * @param prettierConfig
 * @param headers
 * @return {Observable<any>}
 */
function fromContent(content, { writeConfig, prettierConfig, headers }) {
  const { dryRun } = writeConfig;

  const handleDryRun = output => {
    logIfNotSilent(writeConfig, DRY_RUN_BANNER);
    logIfNotSilent(writeConfig, output);
  };

  const handleFileWrite = output => {
    const { directory, encoding, filename } = writeConfig;

    const location = path.join(directory, filename);
    fs.ensureDirSync(directory);
    fs.writeFileSync(location, output, { encoding });

    logIfNotSilent(writeConfig, `✎ … wrote ${location}`);
  };

  const prependHeaders = withPrependToString(...castArray(headers));
  const applyModuleFormat = withApplyModuleFormat(writeConfig);
  const prettify = withPrettier(prettierConfig);
  const write = dryRun ? handleDryRun : handleFileWrite;

  return from([content]).pipe(
    map(prependHeaders),
    map(applyModuleFormat),
    map(prettify),
    tap(write),
  );
}

/**
 * @private Noop returned if the generated content is empty.
 *
 * @param writeConfig
 * @param id
 * @return {Observable<any>}
 */
function fromNoContent(writeConfig, id) {
  return from(['NO_CONTENT']).pipe(
    tap(() =>
      logIfNotSilent(writeConfig, `∅ … no content, skip writing (${id})`),
    ),
  );
}

/**
 * @private Logs `chunks` to stdout if `silent` flag is false.
 *
 * @param writeConfig
 * @param chunks
 */
function logIfNotSilent(writeConfig, ...chunks) {
  const { silent } = writeConfig;

  return logIf(!silent)(...chunks);
}
