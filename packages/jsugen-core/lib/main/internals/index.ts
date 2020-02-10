export {
  flattenContextOverDefinitions,
  flattenContextOverGenerators,
  flattenContextOverSourceFiles,
} from './denormalization';
export {
  enrichDataWithGenerateFunctions,
  enrichDataWithListOfSourceFilePaths,
  enrichDataWithOutputPath,
} from './enrichment';
export { runGenerator } from './runGenerator';
export { fromConfig } from './fromConfig';
