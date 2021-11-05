import config from "./config";
import Server from "./server";

const app = new Server()
  .start(config.port)
  .then((port) => console.log(`Running on port ${port}`))
  .catch((error) => console.error(error));

export default app;
