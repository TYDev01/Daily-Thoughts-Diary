"use client";

import { ConnectWallet, useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen px-6 pb-16 pt-10 sm:px-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="text-xs uppercase tracking-[0.2em]">AA first</Badge>
            <Badge variant="secondary" className="text-xs uppercase tracking-[0.2em]">
              Base ready
            </Badge>
            <Badge variant="secondary" className="text-xs uppercase tracking-[0.2em]">
              Private by default
            </Badge>
          </div>
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl">
            ChainDiary keeps your memories gentle, encrypted, and always within reach.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Write daily reflections, attach images, and earn rewards without ever seeing a private
            key. Smart accounts on Base handle everything behind the scenes.
          </p>
        </header>

        <Card className="border-0 bg-white/70 p-6 shadow-[0_25px_80px_-50px_rgba(24,40,32,0.6)] backdrop-blur">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Sign in to your diary</h2>
              <p className="text-sm text-muted-foreground">
                Email, phone, Google, Apple, wallets, and Farcaster-friendly frame flow.
              </p>
            </div>
            <ConnectWallet
              btnTitle="Open sign-in"
              modalTitle="ChainDiary"
              modalSize="compact"
              theme="light"
              welcomeScreen={{
                title: "Welcome back",
                subtitle: "We will create or recover your smart account automatically.",
              }}
            />
          </div>
        </Card>

        <Card className="border border-border/60 bg-white/70 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Farcaster ready</h3>
              <p className="text-sm text-muted-foreground">
                Launch in Warpcast when your frame handshake is live.
              </p>
            </div>
            <Button asChild variant="secondary" className="h-11 rounded-full px-6">
              <a href="https://warpcast.com/~/apps" target="_blank" rel="noreferrer">
                Open in Warpcast
              </a>
            </Button>
          </div>
        </Card>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Invisible Web3",
              description:
                "AA wallets abstract gas, signing, and recovery. You focus on your words.",
            },
            {
              title: "Chronological calm",
              description:
                "Entries from every volume merge into a single, flowing timeline.",
            },
            {
              title: "IPFS images",
              description:
                "Upload photos once. We render from resilient gateways with graceful fallback.",
            },
          ].map((item) => (
            <Card key={item.title} className="border border-border/60 bg-white/60 p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </section>

        <section className="flex flex-col items-start gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Ready to write today?
          </p>
          <Button className="h-12 rounded-full px-8 text-base" onClick={() => router.push("/dashboard")}>
            Explore the dashboard
          </Button>
        </section>
      </main>
    </div>
  );
}
