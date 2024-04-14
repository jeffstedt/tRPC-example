import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/router';
import yargs from 'yargs';

// Command-line arguments
interface Args {
  getAllUsers?: boolean;
  getUsersByName?: string;
  getUserById?: string;
  createUser?: string;
}

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

const main = async () => {
  // Parse command line arguments and type as Args
  const endpoints = [
    "getAllUsers",
    "getUsersByName",
    "getUserById",
    "createUser"
  ]

  const argv = yargs
    .options({
      getAllUsers: { type: 'boolean' },
      getUsersByName: { type: 'string' },
      getUserById: { type: 'string' },
      createUser: { type: 'string' }
    })
    .argv as Args;

  const { getAllUsers, getUserById, getUsersByName, createUser } = argv;

  if (getAllUsers) {
    const allUsers = await trpc.getAllUsers.query();
    console.log({ input: null, output: allUsers });
  } else if (getUserById) {
    const getUserResult = await trpc.getUserById.query(getUserById);
    console.log({ input: getUserById, output: getUserResult });
  } else if (getUsersByName) {
    const getUserResult = await trpc.getUsersByName.query(getUsersByName);
    console.log({ input: getUsersByName, output: getUserResult });
  } else if (createUser) {
    const user = JSON.parse(createUser);
    const addUser = await trpc.createUser.mutate(user);
    console.log({ input: user, output: addUser });
  } else {
    console.error(`Error: No valid command provided. Use ${endpoints.join(", ")})`);
  }
}

main();
