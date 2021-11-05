import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import User from "../user/user.entity";
import Message from "../message/message.entity";
import Reaction from "../reaction/reaction.entity";
import Conversation from "../conversation/conversation.entity";
import config from "../config";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  entities: [User, Message, Reaction, Conversation],
  logging: "all",
  logger: "advanced-console",
  synchronize: true, // Turn off before prod
};

export default dbConfig;
