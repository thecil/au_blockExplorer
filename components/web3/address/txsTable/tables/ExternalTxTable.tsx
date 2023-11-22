"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import hrefs from "@/data/hrefs.json";
import { AssetTransfersResponse, AssetTransfersCategory } from "alchemy-sdk";
import { AccountProps, Hex } from "@/types/web3";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { sleep } from "@/utils/unixTime";
import { shortAddress, fromHex } from "@/utils/web3";
import Loading from "@/components/Loading";

const maxTxtoShow = 25;
const tHeaders = ["Transaction Hash", "Block", "From", "To", "Value"];

const ExternalTxTable: React.FC<AccountProps> = ({ account }) => {
  const { getAssetTransfers } = useAlchemy();
  const [stage, setStage] = useState(Stages.loading);
  const [transfers, setTransfers] = useState<
    AssetTransfersResponse | undefined
  >();

  const _getTransfers = async () => {
    await sleep(1000);
    const _txs = await getAssetTransfers(
      account,
      AssetTransfersCategory.EXTERNAL
    );
    if (_txs) setTransfers(_txs);
    return;
  };

  useEffect(() => {
    if (!transfers) {
      _getTransfers();
      if (stage !== Stages.loading) setStage(Stages.loading);
      return;
    }
    if (transfers) {
      console.log("ExternalTxTable", { transfers });

      if (stage !== Stages.show) setStage(Stages.show);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, transfers]);

  return (
    <div>
      {stage === Stages.loading && <Loading />}
      {stage === Stages.show && transfers && (
        <>
          <div className="p-4">Latest {maxTxtoShow} transactions</div>
          <div>
            <table className="w-full">
              <thead className="border-b border-gray-500">
                <tr>
                  {tHeaders.map((header, idx) => (
                    <th key={idx} className="px-4 py-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transfers.transfers.map((transfer, idx) => (
                  <>
                    {idx < maxTxtoShow && (
                      <tr key={idx} className="border-b border-gray-500">
                        <td className="px-4 py-2">
                          <div className="w-48 truncate">
                            <Link
                              className="text-blue-500"
                              href={`${hrefs.transaction}/${transfer.hash}`}
                            >
                              {transfer.hash}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-2 w-24">
                          <Link
                            className="text-blue-500"
                            href={`${hrefs.block}/${fromHex(
                              transfer.blockNum as Hex,
                              "number"
                            )}`}
                          >
                            {fromHex(transfer.blockNum as Hex, "number")}
                          </Link>
                        </td>
                        <td className="px-4 py-2 w-24">
                          <Link
                            className="text-blue-500"
                            href={`${hrefs.address}/${transfer.from}`}
                          >
                            {shortAddress(transfer.from)}
                          </Link>
                        </td>
                        <td className="px-4 py-2 w-24">
                          <Link
                            className="text-blue-500"
                            href={`${hrefs.address}/${transfer.to}`}
                          >
                            {shortAddress(transfer.to as string)}
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          {transfer.value} {transfer.asset}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ExternalTxTable;
