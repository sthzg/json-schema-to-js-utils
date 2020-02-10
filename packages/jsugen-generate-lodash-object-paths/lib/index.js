import { $fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { concatMap, map, reduce } from 'rxjs/operators';
import {
  addMemberDefinitionsForNonEnumArrayIndexes,
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  enrichWithPathNodeVars,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withWrite,
} from '@sthzg/jsugen-core';
import { $fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { template as objectPathConstantTemplate } from './objectPathConst.tpl';

export function generate({ sourceFile, writeConfig }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(objectPathConstantTemplate);
  const write = withWrite({
    writeConfig,
    prettierConfig: DEFAULT_PRETTIER_OPTIONS,
    headers: DEFAULT_FILE_DOCSTRING,
    id: 'generate-lodash-object-paths',
  });

  // ---
  // Observable.
  // ---
  return $fromSourceFile(sourceFile).pipe(
    concatMap($fromJsonSchema),

    /* Templating */
    map(enrichWithPathNodeVars),
    concatMap(addMemberDefinitionsForNonEnumArrayIndexes),
    map(compileToTemplate),

    /* Output */
    reduce(toTemplateRawStringReducer, EMPTY_STRING),
    concatMap(write),
  );
}
