import ExtendableError from 'es6-error';
import { EMPTY_STRING } from '../constants';
import { INVALID_GENERATOR_MODULE } from './codes';

export class ModuleNotFoundError extends ExtendableError {
  code: string;

  constructor(moduleName: string) {
    const message = `Unable to resolve generator: ${moduleName}`;
    super(message);

    this.stack = EMPTY_STRING;
    this.code = INVALID_GENERATOR_MODULE;
  }
}
