import * as z from "zod";

export const userUpdateSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
});

type userUpdateType = z.infer<typeof userUpdateSchema>;

export type { userUpdateType };
