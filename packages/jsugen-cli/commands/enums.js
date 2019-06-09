import { generate } from '@sthzg/jsugen-generate-enums';
import { getDefaultOptions, runCommand } from '../lib/commons';

// ---
// Handler.
// ---
export function handler(argv) {
  runCommand({ argv, generate });
}

// ---
// Builder.
// ---
export function builder(yargs) {
  return getDefaultOptions(yargs);
}
