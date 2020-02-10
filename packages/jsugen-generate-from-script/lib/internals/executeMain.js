import { castArray } from 'lodash';

export async function executeMain(module) {
  const { main } = module;

  return castArray(main());
}
