"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "@/utils/wagmiConfig";
import { ClerkProvider } from "@clerk/nextjs";

const appInfo = {
  appName: "thecil - Block Explorer",
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo}>
        <ClerkProvider>
          <ThemeProvider enableSystem={false} attribute="class">
            {mounted && children}
          </ThemeProvider>
        </ClerkProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
