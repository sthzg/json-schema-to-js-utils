import { byLodashGetImport } from '@sthzg/jsugen-core/lib/selectors';
import { concatMap, map, reduce } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  addMemberDefinitionsForNonEnumArrayIndexes,
  enrichWithPathNodeVars,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withWrite,
} from '@sthzg/jsugen-core';
import { $fromSourceFile } from '@sthzg/jsugen-core/lib/sources/sourceFile';
import { $fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { template as selectorFunctionTemplate } from './selector.tpl';

/**
 * Generates selector functions for all values inside the source documents.
 *
 * Selectors are functions that pick a value from an object in a failsafe way or
 * return `defaultReturn` if the property is not defined on the input object.
 *
 *     function byPersonNthAddressNthStreet(
 *       person,
 *       personIndex = 0,
 *       addressIndex = 0,
 *       defaultReturn,
 *     ) {
 *       return get(person, [personIndex, 'address', addressIndex, 'street']);
 *     }
 *
 * TODO unify config (e.g. config: { writeConfig, ...otherConfigs })
 */
export function generate({ sourceFile, writeConfig, config }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(selectorFunctionTemplate);
  const write = withWrite({
    writeConfig,
    prettierConfig: DEFAULT_PRETTIER_OPTIONS,
    headers: [DEFAULT_FILE_DOCSTRING, byLodashGetImport(config)],
    id: 'generate-selector-functions',
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
