// Type definitions for BMA
export as namespace eslintInit;
export enum CiSolution {
  none = 1,
  husky,
  mfe
}

export interface DepConfig {
  [index: string]: string
}

export interface EslintConfig {
  type: string,
  ciSolution: CiSolution,
  sharedEslintConfig?: DepConfig
}

export function init(config: EslintConfig): Promise <boolean>