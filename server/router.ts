import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { Database } from "./database";

export const db = new Database();

export const AppRouter = router({
  getAllUsers: publicProcedure.query(async () => {
    const users = await db.users.getAll();

    console.log("createUser", { input: null, return: users });
    return users
  }),
  getUsersByName: publicProcedure
    .input(z.string()) // Validates input is string
    .query(async ({ input }) => {
      const user = await db.users.getByName(input);

      console.log("getUsersByName", { input: input, return: user });
      return user
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string(), age: z.number() })) // Validates user object
    .mutation(async ({ input }) => {
      const user = await db.users.add(input);

      console.log("createUser", { input: input, return: user });
      return user
    }),
})

export type AppRouter = typeof AppRouter