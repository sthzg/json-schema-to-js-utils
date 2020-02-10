import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { isPlainObject } from 'lodash';
import RefParser from 'json-schema-ref-parser';
// @ts-ignore
import { schemaWalk, vocabularies } from '@cloudflare/json-schema-walker';

/**
 * Returns an observable that emits all nodes from a JSON schema.
 */
export function $fromJsonSchemaWalker(schema: {}) {
  const guardedSchema = byGuardedSchema(schema);
  const dereferencedSchemaPromise = RefParser.dereference(guardedSchema);

  const walk = (dereferencedSchema: {}) =>
    new Observable(subscriber => {
      try {
        schemaWalk(
          dereferencedSchema,
          null,
          // @ts-ignore
          (subschema, path, parent, pathToParent) => {
            subscriber.next({
              schema: subschema,
              path,
              parent,
              pathToParent,
              fullPath: [].concat(pathToParent, path),
            });
          },
          vocabularies.DRAFT_04,
        );
      } catch (error) {
        subscriber.error(error);
      }
      subscriber.complete();
    });

  return from(dereferencedSchemaPromise).pipe(mergeMap(walk));
}

/**
 * @private Ensures that the schema object qualifies as `instanceof Object`
 * to let it pass the type evaluation in `json-schema-walker`.
 *
 * @param schema JSON schema object
 */
function byGuardedSchema(schema: {}) {
  return isPlainObject(schema) ? JSON.parse(JSON.stringify(schema)) : schema;
}
