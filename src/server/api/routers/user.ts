import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { DrizzleError } from "drizzle-orm";
import { z, ZodError } from "zod";
import { TRPCReturnObject } from "../../../lib/classes";
import { updateUser } from "../../queries/user-queries";

export const userRouter = createTRPCRouter({
  updateUserImage: protectedProcedure
    .input(
      z.object({
        imageBase64: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        await updateUser({ id: userId, image: input.imageBase64 });
      } catch (error) {
        if (error instanceof ZodError) {
          return new TRPCReturnObject({
            type: "error",
            message: "You entered wrong values. Please, try again.",
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
          data: error,
          type: "error",
          message:
            "Something went wrong. Our team is notified. Please, try again later, if issue persists, contact the support.",
        });
      }
    }),
});
