"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <h1 className="font-accent text-2xl">Settings are unavailable.</h1>
        <p className="text-sm text-muted-foreground">
          {error.message || "We hit a snag loading your account settings."}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="h-11 rounded-full px-6" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="ghost" className="h-11 rounded-full px-6">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
