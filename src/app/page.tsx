import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SignInButton } from "../components/auth/sign-in-button";
import { SignOutButton } from "../components/auth/sign-out-button";
import { UserButton } from "../components/auth/user-button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-extrabold tracking-tighter">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap text-center text-2xl">
            <UserButton
              user={{ name: session?.user.name, image: session?.user.image }}
            />
            {session && <span>Logged in as </span>}
          </div>

          {session ? (
            <SignOutButton>Log out</SignOutButton>
          ) : (
            <SignInButton>Log in</SignInButton>
          )}
        </div>
      </div>

      {session?.user && <LatestPost />}
    </HydrateClient>
  );
}
