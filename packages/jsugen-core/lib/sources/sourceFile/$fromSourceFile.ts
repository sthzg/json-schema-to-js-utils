import { from, Observable } from 'rxjs';
import { parseSource } from '../../parser';

/**
 * Returns an observable from the required JS module loaded from the
 * `sourceFile` path.
 *
 * @param sourceFile
 */
export function $fromSourceFile(sourceFile: string): Observable<{}> {
  return from(parseSource(sourceFile));
}
