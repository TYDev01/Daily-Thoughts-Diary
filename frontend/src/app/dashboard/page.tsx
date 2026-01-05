"use client";

import { useMemo } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import IpfsImage from "@/components/ipfs-image";
import { useDiaryTimeline } from "@/hooks/useDiaryTimeline";
import { useAppStore } from "@/store/useAppStore";

type Entry = {
  id: string;
  text?: string | null;
  images?: string[] | null;
  timestamp?: string | number | null;
};

const formatDate = (value?: string | number | null) => {
  if (!value) return "—";
  const date = new Date(Number(value));
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const { entries, loading, error } = useDiaryTimeline(user.address);

  const streak = useMemo(() => {
    if (!user.lastRewardTimestamp) return 0;
    const days =
      (Date.now() - user.lastRewardTimestamp * 1000) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.floor(days));
  }, [user.lastRewardTimestamp]);

  const nextRewardAt = user.lastRewardTimestamp
    ? user.lastRewardTimestamp * 1000 + 1000 * 60 * 60 * 24
    : Date.now();

  const rewardProgress = useMemo(() => {
    if (!user.lastRewardTimestamp) {
      return 0;
    }
    const total = 1000 * 60 * 60 * 24;
    const elapsed = Math.min(Date.now() - user.lastRewardTimestamp * 1000, total);
    return Math.round((elapsed / total) * 100);
  }, [user.lastRewardTimestamp]);

  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-accent text-3xl sm:text-4xl">Your diary timeline</h1>
              <p className="text-sm text-muted-foreground">
                Smart account: {user.address ?? "Connecting..."}
              </p>
            </div>
            <Badge variant={user.premium ? "default" : "secondary"}>
              {user.premium ? "Premium" : "Free"}
            </Badge>
          </div>
          <Card className="grid gap-4 border border-border/60 bg-white/70 p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Current streak
              </p>
              <p className="mt-2 text-3xl font-semibold">{streak} days</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Last reward date
              </p>
              <p className="mt-2 text-lg font-semibold">
                {formatDate(user.lastRewardTimestamp * 1000)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Next reward
              </p>
              <p className="mt-2 text-lg font-semibold">{formatDate(nextRewardAt)}</p>
              <Progress className="mt-3 h-2" value={rewardProgress} />
            </div>
          </Card>
        </header>

        <section className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Recent entries</h2>
            <p className="text-sm text-muted-foreground">
              Volumes combined into one calm stream.
            </p>
          </div>
          <Button asChild className="h-11 rounded-full px-6">
            <Link href="/entry/new">Write today’s entry</Link>
          </Button>
        </section>

        <section className="grid gap-6">
          {loading ? (
            <Card className="border border-border/60 bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">Loading entries...</p>
            </Card>
          ) : null}
          {error ? (
            <Card className="border border-border/60 bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">{error}</p>
            </Card>
          ) : null}
          {!loading && !entries.length ? (
            <Card className="border border-border/60 bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">
                No entries yet. Start your first note today.
              </p>
            </Card>
          ) : null}
          {entries.map((entry) => (
            <Card key={entry.id} className="border border-border/60 bg-white/80 p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </p>
                  <Badge variant="secondary">
                    {entry.images?.length ? `${entry.images.length} images` : "Text only"}
                  </Badge>
                </div>
                <p className="text-base leading-7">
                  {entry.text ?? "Entry stored on IPFS."}
                </p>
                {entry.images?.length ? (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {entry.images.map((cid) => (
                      <div
                        key={cid}
                        className="relative h-24 w-32 flex-none overflow-hidden rounded-xl bg-muted/40"
                      >
                        <IpfsImage
                          cid={cid}
                          alt="Diary entry image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
