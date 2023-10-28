export enum Stages {
  loading = "loading",
  show = "show",
}

export interface BlockFees {
  totalTxFees: string;
  burntFees: string;
  blockReward: string;
}