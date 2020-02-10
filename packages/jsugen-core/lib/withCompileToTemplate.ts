import { enrichInTemplate } from './utils';
import { Context } from "./types";

export function withCompileToTemplate(
  templateFn: (c: Context) => string,
): (c: Context) => Context {
  return context => {
    const raw = templateFn(context);

    return enrichInTemplate(context, { raw });
  };
}
