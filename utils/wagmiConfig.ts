import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { ledgerWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

export const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains })
    ]
  }
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});
