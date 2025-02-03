///api/auth/verify-request?provider=nodemailer&type=email
//TODO: USE NUQS

import { InfoCard } from "../../../components/auth/info-card";

type Params = Promise<{ provider?: string; type?: string }>;

export default async function VerifyRequestPage(params: Params) {
  const { provider, type } = await params;

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <InfoCard
          title="Verify your email address."
          description="We sent a verification email to your address. Please, click on the link."
        />
      </div>
    </>
  );
}
