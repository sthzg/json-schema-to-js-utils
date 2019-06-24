import { concatMap, distinct, map, reduce, tap } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  byMemberDefinitionMemberName,
  enrichWithPathNodeVars,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withPrependToString,
  withPrettier,
  withWrite,
} from '@sthzg/jsugen-core';
import { fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { template as memberNamesTemplate } from './memberNames.tpl';

export function generate({ sourceFile, writeConfig }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(memberNamesTemplate);
  const prependHeaders = withPrependToString(DEFAULT_FILE_DOCSTRING);
  const prettify = withPrettier(DEFAULT_PRETTIER_OPTIONS);
  const write = withWrite(writeConfig);

  // ---
  // Observable.
  // ---
  return fromSourceFile(sourceFile).pipe(
    concatMap(fromJsonSchema),

    /* Templating */
    map(enrichWithPathNodeVars),
    distinct(byMemberDefinitionMemberName),
    map(compileToTemplate),

    /* To String */
    reduce(toTemplateRawStringReducer, EMPTY_STRING),
    map(prependHeaders),
    map(prettify),

    /* Output */
    tap(write),
  );
}
