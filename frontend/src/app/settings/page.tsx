"use client";

import { useLogout, useUser } from "@thirdweb-dev/react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";

export default function SettingsPage() {
  const user = useAppStore((state) => state.user);
  const { user: authUser } = useUser();
  const { logout, isLoading } = useLogout();

  const connectedIdentity =
    authUser?.data?.email ??
    authUser?.data?.phoneNumber ??
    authUser?.data?.walletAddress ??
    "Embedded Wallet";

  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-accent text-3xl sm:text-4xl">Settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your account and subscription status.
            </p>
          </div>
          <Badge variant={user.premium ? "default" : "secondary"}>
            {user.premium ? "Premium" : "Free"}
          </Badge>
        </header>

        <Card className="border border-border/60 bg-white/80 p-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Smart account address
              </p>
              <p className="mt-2 text-sm font-medium">
                {user.address ?? "Connecting..."}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Connected identity
              </p>
              <p className="mt-2 text-sm font-medium">{connectedIdentity}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Free image uploads used
              </p>
              <p className="mt-2 text-sm font-medium">
                {user.freeImageUploadsUsed} / 3
              </p>
            </div>
          </div>
        </Card>

        <Card className="border border-border/60 bg-white/80 p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Premium access</h2>
            <p className="text-sm text-muted-foreground">
              Unlock unlimited image uploads and priority rewards. Billing handled server-side.
            </p>
            <Button className="h-11 rounded-full px-6" variant="secondary">
              Upgrade to premium
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button asChild variant="ghost" className="h-11 rounded-full px-6">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
          <Button
            className="h-11 rounded-full px-6"
            variant="destructive"
            onClick={() => logout()}
            disabled={isLoading}
          >
            {isLoading ? "Signing out..." : "Logout"}
          </Button>
        </div>
      </main>
    </div>
  );
}
