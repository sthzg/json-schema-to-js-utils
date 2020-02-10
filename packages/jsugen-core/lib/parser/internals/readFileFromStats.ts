import fs from 'fs';
import path from 'path';
import { isArray } from 'lodash';
import { Stats } from 'webpack';
import { Encoding } from '../../enums';
import { EMPTY_STRING } from '../../constants';

export function readFileFromStats(stats: Stats) {
  const { assetsByChunkName = {}, outputPath = EMPTY_STRING } = stats.toJson();
  const [filename] = Object.values(assetsByChunkName);
  const location = isArray(filename)
    ? path.join(outputPath, filename[0])
    : path.join(outputPath, filename);

  return fs.readFileSync(location, { encoding: Encoding.UTF8 });
}
