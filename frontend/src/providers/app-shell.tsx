"use client";

import type { PropsWithChildren } from "react";

import { useUserSync } from "@/hooks/useUserSync";

export default function AppShell({ children }: PropsWithChildren) {
  useUserSync();

  return <>{children}</>;
}
