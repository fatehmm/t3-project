import { auth } from "@/server/auth";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import * as React from "react";

import { GridPattern } from "@/components/grid-pattern";
import { Shell } from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";

import { Onboarding } from "./_components/onboarding";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Get started with your new store",
};

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  return (
    <Shell className="mx-auto h-[calc(100vh-4rem)]">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className="[mask-image:radial-gradient(300px_circle_at_left_top,white,transparent)]"
      />
      <React.Suspense fallback={<Skeleton className="size-full" />}>
        <Onboarding userId={session?.user.id} />
      </React.Suspense>
    </Shell>
  );
}
