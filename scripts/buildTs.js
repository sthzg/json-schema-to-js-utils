/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const {getPackages} = require('./buildUtils');

const packages = getPackages();

const packagesWithTs = packages.filter(p =>
  fs.existsSync(path.resolve(p, 'tsconfig.json'))
);

const args = [
  '--max-old-space-size=4096',
  path.resolve(
    require.resolve('typescript/package.json'),
    '..',
    require('typescript/package.json').bin.tsc
  ),
  '-b',
  ...packagesWithTs,
  ...process.argv.slice(2),
];

console.log(chalk.inverse('Building TypeScript definition files'));

try {
  execa.sync('node', args, {stdio: 'inherit'});
  console.log(
    chalk.inverse.green('Successfully built TypeScript definition files')
  );
} catch (e) {
  console.error(
    chalk.inverse.red('Unable to build TypeScript definition files')
  );
  console.error(e.stack);
  process.exitCode = 1;
}
