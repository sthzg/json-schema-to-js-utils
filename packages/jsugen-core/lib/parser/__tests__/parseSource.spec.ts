/* eslint-disable global-require,import/no-dynamic-require */
import * as path from 'path';
import { parseSource } from '../parseSource';

const PATH_TO_JSON = path.join(__dirname, './resources/example.json');
const PATH_TO_JSON5 = path.join(__dirname, './resources/example.json5');
const PATH_TO_JS = path.join(__dirname, './resources/example.js');

describe('parseSource()', () => {
  const files = [PATH_TO_JS, PATH_TO_JSON, PATH_TO_JSON5];

  const testFor = (sourceFile: string) => {
    const extension = path.extname(sourceFile);

    test(`should convert ${extension} files`, async () => {
      const source = await parseSource(sourceFile);
      expect(source).toMatchSnapshot();
    });
  };

  files.forEach(testFor);
});
