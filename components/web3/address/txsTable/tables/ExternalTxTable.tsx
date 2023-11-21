import React, { useEffect, useState } from "react";
import { AssetTransfersResponse, AssetTransfersCategory } from "alchemy-sdk";
import { AccountProps } from "@/types/web3";
import { Stages } from "@/types/components";
import { useAlchemy } from "@/hooks/useAlchemy";
import { sleep } from "@/utils/unixTime";
import Loading from "@/components/Loading";

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
      {stage === Stages.show && transfers && <div>show transfers</div>}
    </div>
  );
};

export default ExternalTxTable;
