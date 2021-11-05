import { InputType, Field } from "type-graphql";

@InputType()
class UpdateInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  avatar: string;

  @Field()
  password: string;
}
