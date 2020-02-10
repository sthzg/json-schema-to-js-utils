import { attempt, isError, isFunction } from 'lodash';
import {
  GenerateFunctionNotFoundError,
  ModuleNotFoundError,
} from '../../errors';
import { GenerateFunction } from "../../types";

export function resolveGenerateFunction(
  moduleName: string,
): GenerateFunction | GenerateFunctionNotFoundError {
  const maybeModule = attempt(require, moduleName);

  if (isError(maybeModule)) {
    return new ModuleNotFoundError(moduleName);
  }

  if (!isFunction(maybeModule.generate)) {
    return new GenerateFunctionNotFoundError(moduleName);
  }

  return <GenerateFunction>{
    moduleName,
    generateFunction: maybeModule.generate,
  };
}
