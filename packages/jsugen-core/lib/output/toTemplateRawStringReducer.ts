import { NEWLINE } from '../constants';
import { byTemplateRaw } from '../selectors';

export function toTemplateRawStringReducer(
  result: string,
  current: string,
): string {
  return [result, byTemplateRaw(current)].join(NEWLINE);
}
