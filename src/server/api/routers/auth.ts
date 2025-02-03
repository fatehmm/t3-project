import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { DrizzleError } from "drizzle-orm";
import { ZodError } from "zod";
import { TRPCReturnObject } from "../../../lib/classes";
import { userUpdateSchema } from "../../../validations/user-validations";
import { updateUser } from "../../queries/user-queries";

export const authRouter = createTRPCRouter({
  getCsrf: publicProcedure.query(async () => {
    const response = await fetch(process.env.BASE_URL + "/api/auth/csrf");
    const data = (await response.json()) as { csrfToken: string };
    return data;
  }),

  updateUserInfo: protectedProcedure
    .input(userUpdateSchema)
    .mutation(async ({ input }) => {
      try {
        await updateUser(input);
      } catch (error) {
        if (error instanceof ZodError) {
          return new TRPCReturnObject({
            type: "error",
            message:
              "You entered wrong values. Fix them and please, try again.",
          });
        }
        if (error instanceof DrizzleError) {
          return new TRPCReturnObject({
            type: "error",
            message:
              "There is a problem with internet connection. Please, try again later.",
          });
        }
        return new TRPCReturnObject({
          type: "error",
          message:
            "Something went wrong. Our team notified. Please, try again later.",
        });
      }
    }),

  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       await ctx.db.insert(posts).values({
  //         name: input.name,
  //         createdById: ctx.session.user.id,
  //       });
  //     }),

  //   getLatest: protectedProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
