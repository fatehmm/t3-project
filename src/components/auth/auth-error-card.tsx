"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { type Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthErrorCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  retryLink?: string;
  retryLinkText?: string;
  reset?: () => void;
}
//TODO: Change the name from AuthErrorCard to email change card ??maybe??
export function AuthErrorCard({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  retryLink,
  retryLinkText = "Go back",
  reset,
  className,
  ...props
}: AuthErrorCardProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center overflow-hidden p-10",
        className,
      )}
      {...props}
    >
      <div className="flex w-full justify-center">
        <div className="relative right-1 grid place-items-center rounded-full border border-dashed border-red-700 p-6 text-red-700">
          <Icon className="size-10 text-red-700" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1.5 py-8 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </div>
      {retryLink ? (
        <Link
          href={retryLink}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
          )}
        >
          {retryLinkText}
          <span className="sr-only">{retryLinkText}</span>
        </Link>
      ) : null}
      {reset ? (
        <Button aria-label="Retry" variant="ghost" onClick={reset}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
