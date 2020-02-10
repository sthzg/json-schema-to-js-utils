import { filter, groupBy, mergeMap } from 'rxjs/operators';
import { $reduceGroupToArray } from '../../utils/rxjs';
import {
  byChunkHasJsonSchemaDefinition,
  byChunkRootMemberName,
  byChunkStartsWithPropertiesKeyword,
} from './internals/selectors';
import { $fromJsonSchemaWalker } from './internals/$fromJsonSchemaWalker';
import { $toMemberDefinitions } from './internals/$toMemberDefinitions';
import { JsonSchemaAny } from './types';

/**
 * Returns an observable from the required JSON schema.
 *
 * @param schema parsed JS object of the json schema source file
 */
export function $fromJsonSchema(schema: JsonSchemaAny) {
  return $fromJsonSchemaWalker(schema).pipe(
    /* Filtering */
    filter(byChunkHasJsonSchemaDefinition),
    filter(byChunkStartsWithPropertiesKeyword),

    /* Mapping */
    groupBy(byChunkRootMemberName),
    mergeMap($reduceGroupToArray),
    mergeMap($toMemberDefinitions),
  );
}
