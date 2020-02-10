import ExtendableError from 'es6-error';
import { EMPTY_STRING } from '../constants';
import { PARSE_SOURCE } from './codes';
import { withSeparator } from './utils';

export class ParseSourceError extends ExtendableError {
  code: string;

  constructor(sourceFile: string, details: string) {
    const message = `Unable to parse source from ${sourceFile}:${withSeparator(
      details,
    )}`;
    super(message);

    this.stack = EMPTY_STRING;
    this.code = PARSE_SOURCE;
  }
}
