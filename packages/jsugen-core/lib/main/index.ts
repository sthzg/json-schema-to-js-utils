import { Observable } from "rxjs";
import { concatMap, map } from 'rxjs/operators';
import {
  enrichDataWithGenerateFunctions,
  enrichDataWithListOfSourceFilePaths,
  enrichDataWithOutputPath,
  flattenContextOverDefinitions,
  flattenContextOverGenerators,
  flattenContextOverSourceFiles,
  fromConfig,
  runGenerator,
} from './internals';
import { Context } from "../types";

/**
 * Main generator that runs all generators configured in `config`.
 */
export function generate({ config }: Context): Observable<any> {
  return fromConfig(config).pipe(
    concatMap(flattenContextOverDefinitions),
    map(enrichDataWithListOfSourceFilePaths),
    map(enrichDataWithGenerateFunctions),
    concatMap(flattenContextOverSourceFiles),
    concatMap(flattenContextOverGenerators),
    map(enrichDataWithOutputPath),
    concatMap(runGenerator),
  );
}
