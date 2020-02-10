import toUpper from 'lodash/toUpper';

export function main() {
  return `
export const A = 'A';
export const B = ${toUpper('a')};
`;
}
