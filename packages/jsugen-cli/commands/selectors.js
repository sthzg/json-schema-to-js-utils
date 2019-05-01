/* eslint-disable global-require,import/no-dynamic-require */
import { log, logError } from '@sthzg/jsugen-core/lib/utils';
import generateSelectorsModule from '@sthzg/jsugen-generate-selector-functions';
import { outOption, schemaOption } from './commonOptions';

// ---
// Handler.
// ---
export function handler(argv) {
  const { schema: schemaPath, out } = argv;
  const schema = require(schemaPath);
  generateSelectorsModule({ schema, out }).subscribe(
    () => log('🎉 All done!'),
    error => {
      logError('An error occurred: ', error);
      process.exit(1);
    },
  );
}

// ---
// Builder.
// ---
export function builder(yargs) {
  return yargs.options({
    schema: schemaOption,
    out: outOption,
  });
}
