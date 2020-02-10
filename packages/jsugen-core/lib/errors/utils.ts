import { EMPTY_STRING, NEWLINE } from '../constants';

export function withSeparator(message: string): string {
  const SEPARATOR = '-'.repeat(50);
  return [NEWLINE, SEPARATOR, NEWLINE, message, NEWLINE, SEPARATOR].join(
    EMPTY_STRING,
  );
}
