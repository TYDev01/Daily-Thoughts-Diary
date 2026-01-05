import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppShell from "@/providers/app-shell";
import ThirdwebProviderWrapper from "@/providers/thirdweb-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChainDiary",
  description: "A private, mobile-first diary powered by smart accounts on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
        <ThirdwebProviderWrapper>
          <AppShell>{children}</AppShell>
          <Toaster richColors />
        </ThirdwebProviderWrapper>
      </body>
    </html>
  );
}
