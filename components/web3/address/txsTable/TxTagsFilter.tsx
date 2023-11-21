import React from "react";
import { AssetTransfersCategory } from "alchemy-sdk";

const typesOftx = [
  { name: "Transactions", value: AssetTransfersCategory.EXTERNAL },
  { name: "Internal Transactions", value: AssetTransfersCategory.INTERNAL },
  { name: "Token Transfers (ERC-20)", value: AssetTransfersCategory.ERC20 },
  { name: "NFT Transfers (ERC-721)", value: AssetTransfersCategory.ERC721 },
  { name: "NFT Transfers (ERC-1155)", value: AssetTransfersCategory.ERC1155 },
  { name: "Special NFT", value: AssetTransfersCategory.SPECIALNFT }
];

interface TxTagsFilterProps {
  tagFilter: AssetTransfersCategory;
  setTagFilter: (type: AssetTransfersCategory) => void;
}

const TxTagsFilter: React.FC<TxTagsFilterProps> = ({
  tagFilter,
  setTagFilter
}) => {
  return (
    <div className="flex flex-row flex-wrap overflow-x-auto gap-2">
      {typesOftx.map((type, idx) => (
        <button
          key={idx}
          className={`w-84 px-2 h-8 rounded-lg text-center ${
            tagFilter === type.value
              ? "bg-blue-600"
              : "border border-gray-500 hover:bg-gray-500"
          }`}
          disabled={tagFilter === type.value}
          onClick={() => setTagFilter(type.value)}
        >
          {`${type.name}`}
        </button>
      ))}
    </div>
  );
};

export default TxTagsFilter;
