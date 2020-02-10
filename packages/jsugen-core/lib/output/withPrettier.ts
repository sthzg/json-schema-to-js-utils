import prettier from 'prettier';

export function withPrettier(prettierConfig: {}): (content: string) => string {
  return content => {
    return prettier.format(content, prettierConfig);
  };
}
