import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";
import { siteConfig } from "../../config/site";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    firstName: string;
    lastName: string;
    // role: UserRole;
  }
}

// Define a type for the provider
type EmailProvider = {
  server: string;
  from: string;
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    //!: What would be a great way to welcome new users??? Idk...
    newUser: "/onboarding", //TODO: We will figure out a good way to welcome newly registered users...
    verifyRequest: "/verify-request",
    error: "/",
  },
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,

      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        // const dbUser = await getUserByEmail(email);
        // if (dbUser?.isBanned) {
        //   throw new Error("User is banned.");
        // }
        const { host } = new URL(url);
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host }),
          headers: [
            {
              key: "X-Entity-Ref-ID",
              value: new Date().getTime() + "",
            },
          ],
        });
        const failed = result.rejected.filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) could not be sent`);
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;

function html(params: { url: string; host: string }) {
  const { url } = params;

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-gpxbuymeh-resend.vercel.app/static/raycast-logo.png"
    />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    Log in with this magic link.
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>
  <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style='max-width:37.5em;margin:0 auto;padding:20px 25px 48px;background-image:url("/static/raycast-bg.png");background-position:bottom;background-repeat:no-repeat, no-repeat'
    >
      <tbody>
        <tr style="width:100%">
          <td>
            
            <h1 style="font-size:28px;font-weight:bold;margin-top:48px">
              🪄 Your magic link
            </h1>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin:24px 0"
            >
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:26px;margin:16px 0">
                      <a
                        href="${url}"
                        style="color:#FF6363;text-decoration-line:none"
                        target="_blank"
                        >👉 Click here to sign in 👈</a
                      >
                    </p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0">
                      If you didn&#x27;t request this, please ignore this email.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:16px;line-height:26px;margin:16px 0">
              Best,<br />- ${siteConfig.author}
            </p>
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dddddd;margin-top:48px"
            />
            <img
              height="32"
              src="https://react-email-demo-gpxbuymeh-resend.vercel.app/static/raycast-logo.png"
              style="display:block;outline:none;border:none;text-decoration:none;-webkit-filter:grayscale(100%);filter:grayscale(100%);margin:20px 0"
              width="32"
            />
            <p
              style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px"
            >
              ${siteConfig.companyName}
            </p>
            <p
              style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px"
            >
              ${siteConfig.address}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>

`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
