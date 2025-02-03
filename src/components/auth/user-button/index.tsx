"use client";

import { type User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { UserAvatar } from "@/components/auth/user-button/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "../../../config/site";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserButton({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name ?? undefined,
            image: user.image ?? undefined,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {siteConfig.userButtonNav
          .sort((x, y) => x.order - y.order)
          .map((x) => (
            <DropdownMenuItem key={x.order} asChild>
              <Link href={x.url}>{x.name}</Link>
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            await signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
