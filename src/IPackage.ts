import type { Options as PrettierOptions } from 'prettier';

export interface IPackage {
  // Basic
  name?: string;
  version?: string;
  license?: string;
  author?: string;
  source?: string;
  types?: string;
  main?: string;
  module?: string;
  exports?: string;
  unpkg?: string;
  bin?: string;
  scripts?: Record<string, string>;
  engines?: Record<string, string>;
  // Indirect Config
  config?: {
    webpack?: {
      title?: string;
      publicPath?: string;
      devServerPort?: number;
    };
  };
  // Direct Config
  browserslist?: string[];
  prettier?: PrettierOptions;
}
