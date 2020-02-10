import { castArray } from 'lodash';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config, Context } from '../../types';

export function fromConfig(config: Config): Observable<Context> {
  return from(castArray(config)).pipe(map(() => ({ config, data: {} })));
}
