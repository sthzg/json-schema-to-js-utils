import { get } from 'lodash';
import { Context, Definition, maybeString } from '../../../types';

export function byContextDataDefinition(
  context: Context,
): Definition | undefined {
  return get(context, 'data.definition');
}

export function byContextDataDefinitionFiles(context: Context): Array<string> {
  return get(byContextDataDefinition(context), 'files', []);
}

export function byContextDataDefinitionIgnore(context: Context): string {
  return get(
    byContextDataDefinition(context),
    'ignore',
    '**/node_modules/**/*',
  );
}

export function byContextDataDefinitionGenerators(
  context: Context,
): Array<any> {
  return get(byContextDataDefinition(context), 'generators', []);
}

export function byContextDataDefinitionOutputBaseDirectory(
  context: Context,
): maybeString {
  return get(byContextDataDefinition(context), 'output.baseDirectory');
}

export function byContextDataSourceFile(context: Context): maybeString {
  return get(context, 'data.sourceFile');
}
