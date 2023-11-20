import React, { useEffect, useState } from "react";
import { GetTokensForOwnerResponse } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import { formatGasToLocaleString } from "@/utils/web3";

const TokenHoldings: React.FC<AccountProps> = ({ account }) => {
  const { getTokensForOwner } = useAlchemy();
  const [tokensList, setTokensList] =
    useState<GetTokensForOwnerResponse | null>();
  const [stage, setStage] = useState(Stages.loading);
  const [showList, setShowList] = useState(false);

  const _getTokens = async () => {
    const _tokens = await getTokensForOwner(account);
    if (_tokens) setTokensList(_tokens);
    return;
  };

  useEffect(() => {
    if (!tokensList) {
      _getTokens();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (tokensList) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tokensList]);

  return (
    <div>
      <h2>TOKEN HOLDING S</h2>
      {stage === Stages.loading && <Loading size={12} />}
      {stage === Stages.show && tokensList && (
        <>
          <button
            className="w-full p-2 flex justify-between items-center border border-gray-500 rounded-lg"
            onClick={() => setShowList(!showList)}
          >
            <p>({tokensList.tokens.length}) tokens</p>
            <IconController icon={Icons.down} />
          </button>
          {showList && tokensList && (
            <div className="w-64 h-64 absolute border border-gray-500 rounded-lg bg-neutral-900">
              <input
                className="rounded-lg px-2 my-2 w-full"
                type="text"
                placeholder="Search for token name"
              />
              <div className="w-full h-48 overflow-auto">
                {tokensList.tokens.map((token, idx) => (
                  <>
                    {token.name && (
                      <div key={idx} className="p-2 border-b border-gray-500">
                        <p>
                          {token.name} ({token.symbol})
                        </p>
                        <p>
                          {formatGasToLocaleString(token.balance as string)}{" "}
                          {token.symbol}
                        </p>
                      </div>
                    )}
                  </>
                ))}
              </div>
              <div className="bg-neutral-600 rounded-b-lg">
                View All Holdings
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TokenHoldings;
