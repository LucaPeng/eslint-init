// Type definitions for BMA
export as namespace eslintInit;
export enum CiSolution {
  none = 1,
  husky,
  mfe
}

export interface DepConfig {
  [index: string]: string;
}

export interface EslintConfig {
  type: string;
  supportTypeScript: boolean;
  ciSolution: CiSolution;
  silent?: boolean;
  sharedEslintConfig?: DepConfig;
  pmTool?: string;
}

export function init(config: EslintConfig): Promise <boolean>;
