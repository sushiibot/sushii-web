import { Client } from "pg";
import config from "./config";
import logger from "./logger";

export const client = new Client(config.DATABASE_URL);
client.connect((err) => {
  if (err) {
    logger.error({ stack: err.stack }, "connection error");
  } else {
    logger.info("pg connected");
  }
});
