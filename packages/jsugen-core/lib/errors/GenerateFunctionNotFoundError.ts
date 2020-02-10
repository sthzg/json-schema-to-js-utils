import ExtendableError from 'es6-error';
import { EMPTY_STRING } from '../constants';
import { GENERATE_FUNCTION_NOT_FOUND } from './codes';

export class GenerateFunctionNotFoundError extends ExtendableError {
  code: string;

  constructor(moduleName: string) {
    const message = `Unable import "generate()" from ${moduleName}`;
    super(message);

    this.stack = EMPTY_STRING;
    this.code = GENERATE_FUNCTION_NOT_FOUND;
  }
}
