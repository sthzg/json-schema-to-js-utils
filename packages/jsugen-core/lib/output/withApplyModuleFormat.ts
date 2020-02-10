/* eslint-disable global-require */
import { get } from 'lodash';
import * as babel from '@babel/core';
import { ModuleFormat } from '../enums';
import { WriteConfig } from "../models";

/**
 * For now a minimal local configuration to ensure that ESM can be
 * transpiled into CJS.
 */
const BABEL_CONFIG = {
  plugins: [
    require('@babel/plugin-proposal-export-namespace-from'),
    require('@babel/plugin-syntax-export-default-from'),
    require('@babel/plugin-transform-modules-commonjs'),
  ],
};

export function withApplyModuleFormat(
  writeConfig: WriteConfig,
): (content: string) => string {
  return (content: string) => {
    switch (writeConfig.moduleFormat) {
      case ModuleFormat.CJS: {
        return <string>get(babel.transformSync(content, BABEL_CONFIG), 'code');
      }
      default: {
        return content;
      }
    }
  };
}
