import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../components/ui/sonner";
import { siteConfig } from "../config/site";
import { auth } from "../server/auth";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        className={`${GeistSans.variable} selection:bg-primary selection:text-primary-foreground`}
      >
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
