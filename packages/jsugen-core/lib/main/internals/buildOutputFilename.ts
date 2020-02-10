import { camelCase } from 'lodash';
import { DOT, EMPTY_STRING } from '../../constants';
import { Prefix } from '../../enums';
import { Context } from "../../types";

export function buildOutputFilename(context: Context): string {
  const {
    data: {
      generateFunction: { moduleName },
    },
  } = context;

  return [
    camelCase(moduleName.replace(Prefix.GENERATE_MODULE_NAME, EMPTY_STRING)),
    'js',
  ].join(DOT);
}
