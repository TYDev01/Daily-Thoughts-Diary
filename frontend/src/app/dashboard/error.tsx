"use client";

import { Button } from "@/components/ui/button";

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
        <h1 className="font-accent text-2xl">We lost the timeline.</h1>
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong while loading your entries."}
        </p>
        <Button className="h-11 rounded-full px-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
