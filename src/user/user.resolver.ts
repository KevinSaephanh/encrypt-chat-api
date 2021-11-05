import { Arg, Mutation, Resolver } from "type-graphql";
import UserService from "./user.service";
import RegisterInput from "./inputs/register.input";

@Resolver()
export default class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Mutation(() => Boolean)
  async registerUser(@Arg("register", () => RegisterInput) payload: RegisterInput) {
    try {
      await this.userService.register(payload);
      return true;
    } catch (error) {
      return false;
    }
  }
}
