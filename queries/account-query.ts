import { useQuery } from "@tanstack/react-query";
import type { Web3Address, ENS, AccountBalance } from "@/types/web3";
import { useAlchemy } from "@/hooks/useAlchemy";
import { formatEther } from "@/utils/web3";
import { AssetTransfersCategory } from "alchemy-sdk";

export const useAccountQuery = (account: Web3Address | ENS) => {
  const { getBalance, getTokensForOwner, getAssetTransfers } = useAlchemy();
  // get account balance
  const balanceQuery = useQuery({
    queryKey: ["balanceQuery", account],
    queryFn: async () => {
      const _balance = await getBalance(account);
      if (_balance) {
        const _result: AccountBalance = {
          inEth: formatEther(BigInt(_balance.toString())),
          bigInt: BigInt(_balance.toString())
        };
        return _result;
      }
      return null;
    }
  });
  // get account tokens
  const tokensQuery = useQuery({
    queryKey: ["tokensQuery", account],
    queryFn: () => getTokensForOwner(account)
  });

  // get account assets transactions
  const assetsTxsQuery = useQuery({
    queryKey: ["assetsTxsQuery", account],
    queryFn: () =>
      getAssetTransfers(account as Web3Address, [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.SPECIALNFT
      ])
  });

  return {
    balanceQuery,
    tokensQuery,
    assetsTxsQuery
  };
};
