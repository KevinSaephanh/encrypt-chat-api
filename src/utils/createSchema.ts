import { buildSchema } from "type-graphql";
import UserResolver from "../user/user.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
