import get from 'lodash/get';
import { DEFAULT_GET_IMPORT } from '../constants';

export function byTemplateRaw(context) {
  return get(context, 'template.raw');
}

export function byLodashGetImport(config) {
  return get(config, 'imports.lodashGet', DEFAULT_GET_IMPORT);
}
