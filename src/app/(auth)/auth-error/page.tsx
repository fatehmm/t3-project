///api/auth/verify-request?provider=nodemailer&type=email
//TODO: USE NUQS

import { AuthErrorCard } from "../../../components/auth/auth-error-card";

// type Params = Promise<{ provider?: string; type?: string }>;

export default async function AuthErrorPage() {
  //TODO: Log the error to the error logging service
  
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <AuthErrorCard
          title="There's occured an authentication error"
          description="We got notified about this error. If issue persists, please contact us."
        />
      </div>
    </>
  );
}
