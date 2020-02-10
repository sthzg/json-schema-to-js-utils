import { Observable } from "rxjs";
import { WriteConfig } from '../../models';
import { Context } from "../../types";

export function runGenerator(context: Context): Observable<any> {
  const {
    config,
    config: { dryRun, silent, moduleFormat },
    data: {
      generateFunction: { generateFunction },
      sourceFile,
      outputDirectory,
      outputFilename,
    },
  } = context;

  const writeConfig = new WriteConfig({
    directory: outputDirectory,
    filename: outputFilename,
    dryRun,
    moduleFormat,
    silent,
  });

  return generateFunction({ sourceFile, writeConfig, config });
}
