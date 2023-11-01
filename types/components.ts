// general stages for comps
export enum Stages {
  loading = "loading",
  show = "show",
}
// used on utils/web3 => getBlockReward
export interface BlockFees {
  totalTxFees: string;
  burntFees: string;
  blockReward: string;
}

// used in IconController and to specify which icon to use for it
export enum Icons {
  block = "block",
  help = "help",
  time = "time",
  copy = "copy",
  check = "check",
  transaction = "transaction"
}