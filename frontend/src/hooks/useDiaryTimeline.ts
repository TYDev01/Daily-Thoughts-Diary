"use client";

import { useEffect, useMemo, useState } from "react";

import { graphFetch, USER_OVERVIEW_QUERY } from "@/lib/graph";

type Entry = {
  id: string;
  text?: string | null;
  images?: string[] | null;
  timestamp?: string | number | null;
  cid?: string | null;
};

type GraphData = {
  entries?: Entry[];
  volumes?: { id: string; cid: string; timestamp: string }[];
};

export const useDiaryTimeline = (userAddress?: string | null) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userAddress) {
      setEntries([]);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await graphFetch<GraphData>(USER_OVERVIEW_QUERY, {
          user: userAddress.toLowerCase(),
        });

        if (cancelled) {
          return;
        }

        const volumeEntries =
          data.volumes?.map((volume) => ({
            id: volume.id,
            cid: volume.cid,
            timestamp: volume.timestamp,
            text: null,
            images: [],
          })) ?? [];

        const timeline = [...(data.entries ?? []), ...volumeEntries].sort((a, b) => {
          return Number(b.timestamp ?? 0) - Number(a.timestamp ?? 0);
        });

        setEntries(timeline);
      } catch {
        if (!cancelled) {
          setError("Unable to load timeline");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [userAddress]);

  const latest = useMemo(() => entries[0], [entries]);

  return { entries, loading, error, latest };
};
