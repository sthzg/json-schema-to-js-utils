import { concatMap, filter, map, reduce } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  byMemberDefinitionIsEnum,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withWrite,
  enrichWithPathNodeVars,
} from '@sthzg/jsugen-core';
import { $fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { $fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { buildTemplateVars } from './buildTemplateVars';
import { template as enumModuleTemplate } from './enum.tpl';

export function generate({ sourceFile, writeConfig }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(enumModuleTemplate);
  const write = withWrite({
    writeConfig,
    prettierConfig: DEFAULT_PRETTIER_OPTIONS,
    headers: DEFAULT_FILE_DOCSTRING,
    id: 'generate-enums',
  });

  // ---
  // Observable.
  // ---
  return $fromSourceFile(sourceFile).pipe(
    concatMap($fromJsonSchema),

    /* Filtering */
    filter(byMemberDefinitionIsEnum),

    /* Templating */
    map(enrichWithPathNodeVars),
    map(buildTemplateVars),
    map(compileToTemplate),

    /* Output */
    reduce(toTemplateRawStringReducer, EMPTY_STRING),
    concatMap(write),
  );
}
