import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { byMemberDefinitionId } from '../../../selectors';
import { toMemberDefinitions } from './normalization';

export function $toMemberDefinitions(branches) {
  return from(toMemberDefinitions(branches)).pipe(
    distinct(byMemberDefinitionId),
  );
}
