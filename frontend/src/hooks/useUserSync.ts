"use client";

import { useAddress, useUser } from "@thirdweb-dev/react";
import { useEffect } from "react";

import { apiFetch } from "@/lib/api";
import { graphFetch, USER_OVERVIEW_QUERY } from "@/lib/graph";
import { useAppStore } from "@/store/useAppStore";

type UserStatusResponse = {
  premium: boolean;
  freeImageUploadsUsed: number;
  lastRewardTimestamp: number;
};

type GraphUser = {
  user?: {
    premium?: boolean;
    freeImageUploadsUsed?: number;
    lastRewardTimestamp?: string;
  } | null;
};

export const useUserSync = () => {
  const address = useAddress();
  const { isLoggedIn } = useUser();
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    if (!address || !isLoggedIn) {
      setUser({ address: address ?? null, isAuthenticated: false });
      return;
    }

    let cancelled = false;

    const sync = async () => {
      try {
        const status = await apiFetch<UserStatusResponse>("/user/status");
        const graph = await graphFetch<GraphUser>(USER_OVERVIEW_QUERY, {
          user: address.toLowerCase(),
        });

        if (cancelled) {
          return;
        }

        const graphPremium = graph.user?.premium ?? status.premium;
        const graphFreeUploads =
          graph.user?.freeImageUploadsUsed ?? status.freeImageUploadsUsed;
        const graphLastReward = graph.user?.lastRewardTimestamp
          ? Number(graph.user.lastRewardTimestamp)
          : status.lastRewardTimestamp;

        setUser({
          address,
          isAuthenticated: true,
          premium: graphPremium,
          freeImageUploadsUsed: graphFreeUploads,
          lastRewardTimestamp: graphLastReward,
        });
      } catch {
        if (!cancelled) {
          setUser({ address, isAuthenticated: true });
        }
      }
    };

    sync();

    return () => {
      cancelled = true;
    };
  }, [address, isLoggedIn, setUser]);
};
