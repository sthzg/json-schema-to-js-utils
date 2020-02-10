import { withEnrichByFlattenOverArray } from '../../utils';
import { Context } from "../../types";

export const flattenContextOverDefinitions = withEnrichByFlattenOverArray<
  Context
>({
  sourcePath: 'config.definitions',
  targetPath: 'data.definition',
  redactLabel: 'flattenContextOverDefinitions',
});

export const flattenContextOverGenerators = withEnrichByFlattenOverArray<
  Context
>({
  sourcePath: 'data.generateFunctions',
  targetPath: 'data.generateFunction',
  redactLabel: 'flattenContextOverGenerators',
});

export const flattenContextOverSourceFiles = withEnrichByFlattenOverArray<
  Context
>({
  sourcePath: 'data.sourceFiles',
  targetPath: 'data.sourceFile',
  redactLabel: 'flattenContextOverSourceFiles',
});
