import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import dbConfig from "./db/db";
import config from "./config/config";
import { createSchema } from "./utils/createSchema";

class Server {
  private readonly PORT = config.port;
  private app: express.Application;
  private apolloServer: ApolloServer;
  private schema: any;

  constructor() {
    this.createApp();
    this.config();
    this.routeConfig();
    this.dbConnect();
  }

  private createApp() {
    this.app = express();
  }

  private config() {
    this.app.set("port", this.PORT);
    this.app.use(express.json());
  }

  private routeConfig() {
    this.app.use("/");
  }

  private async createSchema() {
    this.schema = await createSchema();
  }

  private async dbConnect() {
    try {
      await createConnection(dbConfig);
      console.log("Successfully connected to database!");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => resolve(port)).on("error", (error) => reject(error));
    });
  };
}

export default Server;
