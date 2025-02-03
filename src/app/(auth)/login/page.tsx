import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmailForm from "../../../components/client/email-form";
import { Shell } from "../../../components/shell";

export default function LoginPage() {
  return (
    <>
      <Shell
        variant={"sidebar"}
        className="flex h-screen !w-screen items-center justify-center"
      >
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>
              Enter your email to log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Shell>
    </>
  );
}
