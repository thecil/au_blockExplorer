"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TransactionResponse, Block } from "alchemy-sdk";
import { Hex, ENS } from "@/types/web3";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "../Loading";

enum SearchStages {
  loading = "loading",
  ens = "ens",
  block = "block",
  txn = "transaction",
  contract = "contract",
  error = "error",
}

interface SearchResultProps {
  input: Hex | ENS | number;
}

const SearchResult: React.FC<SearchResultProps> = ({ input }) => {
  const { isContractAddress, getBlock, getTransaction, getEnsOwner } =
    useAlchemy();
  const [stage, setStage] = useState(SearchStages.loading);
  const [isContract, setIsContract] = useState(false);
  const [block, setBlock] = useState<Block | null>();
  const [txn, setTxn] = useState<TransactionResponse | null>();

  const ensOwner = useMemo(() => {
    return typeof input === "string" && input.includes(".eth")
      ? getEnsOwner(input as ENS)
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const _getBlock = async () => {
    const _block = await getBlock(input as number);
    console.log("SearchResult:_getBlock", _block);

    if (_block) setBlock(_block);
  };
  const _getTxn = async () => {
    const _txn = await getTransaction(input as Hex);
    console.log("SearchResult:_getTxn", _txn);
    if (_txn) setTxn(_txn);
  };

  const _isContractAddress = async () => {
    const _isContract = await isContractAddress(input as Hex);
    console.log("SearchResult:_isContractAddress", _isContract);
    setIsContract(_isContract);
  };

  useEffect(() => {
    //   input is number means is block number
    if (typeof input === "number") {
      _getBlock();
      if (block) {
        if (stage !== SearchStages.block) setStage(SearchStages.block);
        return;
      }
      // input is string
    } else if (typeof input === "string") {
      // is ENS
      if (ensOwner) {
        if (stage !== SearchStages.ens) setStage(SearchStages.ens);
        return;
      } else {
        //  is contract
        _isContractAddress();
        if (isContract) {
          if (stage !== SearchStages.contract) setStage(SearchStages.contract);
          return;
        } else if (!isContract) {
          //   is transaction
          _getTxn();
          if (txn) {
            if (stage !== SearchStages.txn) setStage(SearchStages.txn);
            return;
          }
        }
      }
    } else {
      if (stage !== SearchStages.error) setStage(SearchStages.error);
      return;
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, ensOwner, stage]);

  return (
    <div className="relative bg-white dark:bg-black w-full border rounded-lg">
      {stage === SearchStages.loading ? <Loading /> : null}
      {stage === SearchStages.ens && ensOwner ? (
        <div>ENS Owner:{ensOwner}</div>
      ) : null}
      {stage === SearchStages.block ? <div>Show block</div> : null}
      {stage === SearchStages.txn ? <div>Show txn</div> : null}
      {stage === SearchStages.contract ? <div>Show contract</div> : null}
      {stage === SearchStages.error ? <div>Show error</div> : null}
    </div>
  );
};

export default SearchResult;
