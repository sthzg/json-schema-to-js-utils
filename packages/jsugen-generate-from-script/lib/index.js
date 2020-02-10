import { concatMap } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  withWrite,
} from '@sthzg/jsugen-core';
import { $fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { executeMain } from './internals';

export function generate({ sourceFile, writeConfig }) {
  const write = withWrite({
    writeConfig,
    prettierConfig: DEFAULT_PRETTIER_OPTIONS,
    headers: DEFAULT_FILE_DOCSTRING,
    id: 'generate-from-script',
  });

  return $fromSourceFile(sourceFile).pipe(
    concatMap(executeMain),
    concatMap(write),
  );
}
