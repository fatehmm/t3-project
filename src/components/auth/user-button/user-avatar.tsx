import { type AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserIcon } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: { image?: string; name?: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage
          alt="Picture"
          src={user.image}
          className="contain-content"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
