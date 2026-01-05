"use client";

import { Base, BaseSepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  frameWallet,
  metamaskWallet,
  smartWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import type { PropsWithChildren } from "react";

import { env } from "@/lib/env";

const smartEmbeddedWallet = smartWallet(
  embeddedWallet({
    auth: {
      options: ["email", "phone", "google", "apple"],
    },
    recommended: true,
  }),
  {
    gasless: true,
  },
);

export default function ThirdwebProviderWrapper({
  children,
}: PropsWithChildren) {
  const domain =
    typeof window !== "undefined" ? window.location.host : "localhost";

  return (
    <ThirdwebProvider
      clientId={env.thirdwebClientId}
      activeChain={BaseSepolia}
      supportedChains={[Base, BaseSepolia]}
      supportedWallets={[
        smartEmbeddedWallet,
        frameWallet(),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      authConfig={{
        domain,
        authUrl: `${env.backendUrl}/auth`,
        loginOptional: false,
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
