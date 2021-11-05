import "dotenv/config";

const environment = process.env.NODE_ENV || "development";
const isProd = environment == "production";

export default {
  environment,
  isProd,
  port: process.env.PORT || 8000,
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    tokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
    saltRounds: process.env.SALT_ROUNDS,
  },
  db: {
    host: isProd ? process.env.DB_HOST : process.env.DEV_DB_HOST,
    name: isProd ? process.env.DB_NAME : process.env.DEV_DB_NAME,
    port: isProd ? process.env.DB_PORT : process.env.DEV_DB_PORT,
    username: isProd ? process.env.DB_USERNAME : process.env.DEV_DB_USERNAME,
    password: isProd ? process.env.DB_PASSWORD : process.env.DEV_DB_PASSWORD,
    type: "postgres",
  },
};
