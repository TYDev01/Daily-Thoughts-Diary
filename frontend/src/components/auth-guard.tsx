"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import { useAppStore } from "@/store/useAppStore";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.replace("/");
    }
  }, [router, user.isAuthenticated]);

  if (!user.isAuthenticated) {
    return (
      <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <div className="h-8 w-40 rounded-full bg-muted/40" />
          <div className="h-4 w-64 rounded-full bg-muted/30" />
          <div className="h-64 rounded-3xl bg-muted/30" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
