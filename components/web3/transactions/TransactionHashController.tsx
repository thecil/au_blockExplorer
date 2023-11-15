"use client";

import React, { useState, useEffect } from "react";
import { Stages } from "@/types/components";
import { Transaction } from "@/types/web3";
import iconDesciptions from "@/data/iconDescriptions.json";
import { useAlchemy } from "@/hooks/useAlchemy";
import Loading from "@/components/Loading";
import BlockOrTxContent from "@/components/web3/BlockOrTxContent";
import CopyToClipboardButton from "@/components/CopyToClipboard";
import TxDetailsAccordion from "@/components/web3/transactions/TxDetailsAccordion";
import TxDetails from "@/components/web3/transactions/TxDetails";

interface TransactionHashControllerProps {
  txHash: string;
}
const TransactionHashController: React.FC<TransactionHashControllerProps> = ({
  txHash
}) => {
  const [stage, setStage] = useState(Stages.loading);
  const [tx, setTx] = useState<Transaction>();
  const { getTransactionReceipt, getTransaction } = useAlchemy();
  const { transaction: iconDescription } = iconDesciptions;

  const _getTx = async () => {
    const _receipt = await getTransactionReceipt(txHash);
    const _response = await getTransaction(txHash);
    const _transaction: Transaction = {
      receipt: _receipt,
      response: _response
    };
    console.log("_getTx", { _transaction });
    if (_transaction.receipt !== null || _transaction.response !== null)
      setTx(_transaction);
    return;
  };

  useEffect(() => {
    if (!tx) {
      _getTx();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (tx) {
      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tx]);
  return (
    <div className="p-4 min-h-screen">
      {/* tx hash header*/}
      <div className="py-4 border-b border-gray-500 ">
        <h2 className="font-bold text-xl">Transaction Details</h2>
      </div>
      {stage === Stages.loading && <Loading size={64} />}
      {stage === Stages.show && tx && (
        <>
          <div className="rounded-lg bg-slate-100 dark:bg-black p-4 mt-2 flex flex-col space-y-2">
            {/* tx hash */}
            <BlockOrTxContent
              title="Transaction Hash"
              iconDescription={iconDescription.txHash}
            >
              <div className="flex space-x-1 items-center">
                <span className="truncate ">{txHash}</span>
                <CopyToClipboardButton text={txHash} />
              </div>
            </BlockOrTxContent>
            <TxDetails tx={tx} />
          </div>
          {/* more details accordion */}
          <TxDetailsAccordion tx={tx} />
        </>
      )}
    </div>
  );
};

export default TransactionHashController;