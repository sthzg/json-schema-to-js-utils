import {
  cloneDeep,
  get,
  isArray,
  isUndefined,
  mapKeys,
  merge,
  mergeWith,
  set,
} from 'lodash';
import { DOT } from '../constants';
import { Prefix } from '../enums';
import { Context } from "../types";

// ---
// Enrichment Utils.
// ---
export function enrichIn<T>(
  targetObject: Record<string, any>,
  keyValueObject: Record<string, any>,
  prefix?: string,
): T {
  const keyValueObjectWithPrefix = mapKeys(keyValueObject, (value, key) =>
    [prefix, key].filter(Boolean).join(DOT),
  );

  return mergeSet(targetObject, keyValueObjectWithPrefix);
}

export function enrichInData(
  targetObject: Context,
  keyValueObject: Record<string, any>,
): Context {
  return enrichIn(targetObject, keyValueObject, Prefix.DATA);
}

export function enrichInTemplate(
  targetObject: Context,
  keyValueObject: Record<string, any>,
): Context {
  return enrichIn(targetObject, keyValueObject, Prefix.TEMPLATE);
}

/**
 * Flattens an input object over an array at `sourcePath`, e.g:
 *
 * In:  [{ a: 1, sourcePath: [1, 2, 3] }]
 * Out: [{ a: 1, targetPath: 1 }, { a: 1, targetPath: 2 }, { a: 1, targetPath: 3 }]
 *
 * It is used to flatten the .jsugen.config.js object over each `definition` entry which allows
 * the data pipeline to execute the generators one by one while having access to all config values.
 *
 * @param sourcePath -  object path to `input` member that should be flattened over
 * @param targetPath - object path where flattened item will be set to
 * @param redactSourcePath - bool indicating whether to keep original value at source path
 * @param redactLabel - debug label to add at `sourcePath` if `redactSourcePath` is true
 * @return {function(*=): *}
 */
export function withEnrichByFlattenOverArray<T>({
  sourcePath,
  targetPath,
  redactSourcePath = true,
  redactLabel = 'enrichByFlattenOverArray',
}: {
  sourcePath: string;
  targetPath: string;
  redactSourcePath?: boolean;
  redactLabel?: string;
}): (input: T) => Array<T> {
  return function enrichByFlattenOverArray(input): Array<T> {
    const sources = get(input, sourcePath, []);

    return sources.map((source: any) =>
      enrichIn(input, {
        [targetPath]: source,
        [sourcePath]: redactSourcePath
          ? `[lifecycle]: consumed in ${redactLabel}`
          : sources,
      }),
    );
  };
}

// ---
// Merge Utils.
// ---
export function mergeSet(
  targetObject: Record<string, any>,
  keyValueObject: Record<string, any>,
) {
  return merge(
    cloneDeep(targetObject),
    ...Object.entries(keyValueObject)
      .filter(([, value]) => !isUndefined(value))
      .map(([path, value]) => set({}, path, value)),
  );
}
export function mergeConcat(
  targetObject: Record<string, any>,
  ...sources: any
) {
  const customizer = (objValue: any, srcValue: any) =>
    isArray(objValue) ? objValue.concat(srcValue) : undefined;

  return mergeWith(targetObject, ...sources, customizer);
}
