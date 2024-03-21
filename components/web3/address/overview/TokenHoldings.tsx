import React, { useEffect, useState, useRef } from "react";
import { GetTokensForOwnerResponse } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { Icons } from "@/types/components";
import Loading from "@/components/Loading";
import IconController from "@/components/IconController";
import { formatGasToLocaleString } from "@/utils/web3";
import { useAccountQuery } from "@/queries/account-query";

const TokenHoldings: React.FC<AccountProps> = ({ account }) => {
  const { tokensQuery } = useAccountQuery(account);
  const { data: tokens, isLoading } = tokensQuery;
  const [stage, setStage] = useState(Stages.loading);

  useEffect(() => {
    if (isLoading) {
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (tokens) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tokens, isLoading]);

  return (
    <div>
      <h2>TOKEN HOLDINGS</h2>
      {stage === Stages.loading && <Loading size={12} />}
      {stage === Stages.show && tokens && (
        <OldTokensDropDown tokensList={tokens} />
      )}
    </div>
  );
};

const OldTokensDropDown = ({
  tokensList
}: {
  tokensList: GetTokensForOwnerResponse;
}) => {
  const [showList, setShowList] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        listButtonRef.current !== event.target
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);
  return (
    <>
      <button
        ref={listButtonRef}
        className="w-full p-2 flex justify-between items-center border border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black rounded-lg"
        onClick={() => setShowList(!showList)}
      >
        <p>({tokensList.tokens.length}) tokens</p>
        <IconController icon={Icons.down} />
      </button>
      {showList && tokensList && (
        <div
          ref={listRef}
          className="mt-1 w-3/4 md:w-1/3 h-min absolute border border-neutral-200 bg-slate-100 dark:border-neutral-800 dark:bg-black rounded-lg "
        >
          <div className="p-2">
            <input
              className="rounded-lg px-2 my-2 w-full"
              type="text"
              placeholder="Search for token name"
            />
          </div>
          <div className="w-full max-h-64 overflow-auto p-2">
            {tokensList.tokens.map((token, idx) => (
              <>
                {token.name && (
                  <div key={idx}>
                    <div className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:rounded-lg">
                      <p>
                        {token.name} ({token.symbol})
                      </p>
                      <p>
                        {formatGasToLocaleString(token.balance as string)}{" "}
                        {token.symbol}
                      </p>
                    </div>

                    <div className="my-2 border-b dark:border-neutral-500 w-full"></div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="p-2 flex items-center justify-center space-x-2 bg-neutral-200 dark:bg-neutral-600 rounded-b-lg">
            <IconController icon={Icons.wallet} />
            <p>VIEW ALL HOLDINGS</p>
          </div>
        </div>
      )}
    </>
  );
};
export default TokenHoldings;
