import { concatMap, map, reduce, tap } from 'rxjs/operators';
import {
  DEFAULT_FILE_DOCSTRING,
  DEFAULT_PRETTIER_OPTIONS,
  EMPTY_STRING,
  enrichWithPathNodeTemplateVars,
  toTemplateRawStringReducer,
  withCompileToTemplate,
  withPrependToString,
  withPrettier,
  withWrite,
} from '@sthzg/jsugen-core';
import { fromJsonSchema } from '@sthzg/jsugen-core/lib/sources/jsonSchema';
import { template as objectPathConstantTemplate } from './objectPathConst.tpl';

export function generateObjectPathsModule({ schema, out }) {
  // ---
  // Configure Transformer Factories.
  // ---
  const compileToTemplate = withCompileToTemplate(objectPathConstantTemplate);
  const prependHeaders = withPrependToString(DEFAULT_FILE_DOCSTRING);
  const prettify = withPrettier(DEFAULT_PRETTIER_OPTIONS);
  const write = withWrite(out);

  // ---
  // Observable.
  // ---
  return fromJsonSchema(schema).pipe(
    /* Templating */
    concatMap(enrichWithPathNodeTemplateVars),
    map(compileToTemplate),

    /* To String */
    reduce(toTemplateRawStringReducer, EMPTY_STRING),
    map(prependHeaders),
    map(prettify),

    /* Output */
    tap(write),
  );
}
