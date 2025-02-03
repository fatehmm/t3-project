"use server";
import { DrizzleError, eq } from "drizzle-orm";
import "server-only";
import { ZodError, type z } from "zod";
import { userUpdateSchema } from "../../validations/user-validations";
import { db } from "../db";
import { users } from "../db/schema";

export const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
};

export const updateUserName = async (name: string, id: string) =>
  db.update(users).set({ name: name }).where(eq(users.id, id));

export const updateFirstName = async (firstName: string, id: string) =>
  db.update(users).set({ firstName: firstName }).where(eq(users.id, id));

export const updateLastName = async (lastName: string, id: string) =>
  db.update(users).set({ lastName: lastName }).where(eq(users.id, id));

export const deleteUser = async (id: string) =>
  db.delete(users).where(eq(users.id, id)).returning();

export const updateUser = async (
  userUpdateBody: z.infer<typeof userUpdateSchema>,
) => {
  try {
    const parsedBody = userUpdateSchema.parse(userUpdateBody);
    const payload = Object.fromEntries(
      Object.entries(parsedBody).filter(([_, value]) => Boolean(value)),
    );
    await db.update(users).set(payload).where(eq(users.id, parsedBody.id));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        "Body cannot be parsed. Maybe you did not have proper values for arguments.",
        { cause: "Zod could not parse the userUpdateBody argument." },
      );
    }
    if (error instanceof DrizzleError) {
      throw new Error("Something happened with the database. Please fix it.", {
        cause: "Drizzle error happened. Please, fix.",
      });
    }
    console.error(error);
    //TODO: Log the error to the error logging service.
    throw new Error("Unexpected error. We are working on the fix.", {
      cause: "Unexpected error.",
    });
  }
};
