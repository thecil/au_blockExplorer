"use client";
import React, { useEffect, useState } from "react";
import { TransactionResponse, Block } from "alchemy-sdk";
import { Hex, ENS, Web3Address } from "@/types/web3";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "../Loading";

enum SearchStages {
  loading = "loading",
  ens = "ens",
  block = "block",
  txn = "transaction",
  contract = "contract",
  address = "address",
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
  const [block, setBlock] = useState<Block | undefined>();
  const [txn, setTxn] = useState<TransactionResponse | undefined>();
  const [ensOwner, setEnsOwner] = useState<Web3Address | undefined>();

  const _getEnsOwner = async () => {
    if (typeof input === "string" && input.includes(".eth")) {
      const _ensOwner = await getEnsOwner(input as ENS);
      if (_ensOwner) setEnsOwner(_ensOwner as Web3Address);
    }
    return;
  };

  const _getBlock = async () => {
    const _block = await getBlock(input as number);
    console.log("SearchResult:_getBlock", _block);

    if (_block) setBlock(_block);
    return;
  };
  const _getTxn = async () => {
    const _txn = await getTransaction(input as Hex);
    console.log("SearchResult:_getTxn", _txn);
    if (_txn) setTxn(_txn);
    return;
  };

  const _isContractAddress = async () => {
    const _isContract = await isContractAddress(input as Hex);
    console.log("SearchResult:_isContractAddress", _isContract);
    setIsContract(_isContract);
    return;
  };

  useEffect(() => {
    //   input is number means is block number
    if (typeof input === "number") {
      if (!block) _getBlock();
      if (block) {
        if (stage !== SearchStages.block) setStage(SearchStages.block);
        return;
      }
    }
    // input is string, could be ENS, address/contract, or txn hash
    if (typeof input === "string") {
      // is ENS
      if (input.length < 42) {
        if (!ensOwner) _getEnsOwner();
        if (ensOwner) {
          if (stage !== SearchStages.ens) setStage(SearchStages.ens);
          return;
        }
      }
      // is Address
      if (input.length === 42) {
        //  is contract
        if (!isContract) {
          _isContractAddress();
          if (stage !== SearchStages.address) setStage(SearchStages.address);
          return;
        }
        if (isContract) {
          if (stage !== SearchStages.contract) setStage(SearchStages.contract);
          return;
        }
      }
      // is Hash
      if (input.length === 66) {
        //   is transaction
        if (!txn) _getTxn();
        if (txn) {
          if (stage !== SearchStages.txn) setStage(SearchStages.txn);
          return;
        }
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, ensOwner, block, isContract, txn, stage]);

  return (
    <div className="absolute bg-white dark:bg-black w-full border dark:border-neutral-600 rounded-lg p-2">
      {stage === SearchStages.loading ? <Loading /> : null}
      {stage === SearchStages.ens && ensOwner ? (
        <div>ENS Owner:{ensOwner}</div>
      ) : null}
      {stage === SearchStages.block ? <div>Show block</div> : null}
      {stage === SearchStages.txn ? <div>Show txn</div> : null}
      {stage === SearchStages.address ? <div>Show address</div> : null}
      {stage === SearchStages.contract ? <div>Show contract</div> : null}
      {stage === SearchStages.error ? <div>Show error</div> : null}
    </div>
  );
};

export default SearchResult;
