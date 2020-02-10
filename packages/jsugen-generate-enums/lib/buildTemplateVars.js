import { replace, sortBy } from 'lodash';
import {
  EMPTY_STRING,
  Postfix,
  arrayToEnum,
  enrichInTemplate,
  toUpperFirstCamelCase,
} from '@sthzg/jsugen-core';

export function buildTemplateVars(memberDefinition) {
  const {
    template: {
      vars: { enumValues, name },
    },
  } = memberDefinition;

  const removeNth = input => replace(input, Postfix.NTH, EMPTY_STRING);

  const sortedEnumValues = sortBy(enumValues);
  const valueName = removeNth(toUpperFirstCamelCase(name, Postfix.VALUES));
  const enumName = removeNth(toUpperFirstCamelCase(name));

  const vars = {
    valuesConstant: {
      name: valueName,
      values: sortedEnumValues,
    },
    enumConstant: {
      name: enumName,
      values: arrayToEnum(sortedEnumValues),
    },
  };

  return enrichInTemplate(memberDefinition, { vars });
}
