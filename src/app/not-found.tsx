"use client";
import { useRouter } from "next/navigation";
import { ErrorCard } from "../components/error-card";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ErrorCard
        className="max-w-[400px]"
        title="Page cannot be found"
        description="You wanted to go to a place that does not exist. Maybe try going to a different place?"
        retryLink="/"
        retryLinkText="Go home"
      />
    </div>
  );
}
