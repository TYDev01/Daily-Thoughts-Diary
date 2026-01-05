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

const smartMetamaskWallet = smartWallet(metamaskWallet(), { gasless: true });
const smartCoinbaseWallet = smartWallet(coinbaseWallet(), { gasless: true });
const smartWalletConnect = smartWallet(walletConnect(), { gasless: true });
const smartFrameWallet = smartWallet(frameWallet(), { gasless: true });

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
        smartFrameWallet,
        smartMetamaskWallet,
        smartCoinbaseWallet,
        smartWalletConnect,
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
