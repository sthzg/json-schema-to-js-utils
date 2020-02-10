import { concatMap, distinct, map, reduce } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  byMemberDefinitionMemberName,
  enrichWithPathNodeVars,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withWrite,
} from '@sthzg/jsugen-core';
import { $fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { $fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { template as memberNamesTemplate } from './memberNames.tpl';

export function generate({ sourceFile, writeConfig }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(memberNamesTemplate);
  const write = withWrite({
    writeConfig,
    prettierConfig: DEFAULT_PRETTIER_OPTIONS,
    headers: DEFAULT_FILE_DOCSTRING,
    id: 'generate-member-names',
  });

  // ---
  // Observable.
  // ---
  return $fromSourceFile(sourceFile).pipe(
    concatMap($fromJsonSchema),

    /* Templating */
    map(enrichWithPathNodeVars),
    distinct(byMemberDefinitionMemberName),
    map(compileToTemplate),

    /* Output */
    reduce(toTemplateRawStringReducer, EMPTY_STRING),
    concatMap(write),
  );
}
