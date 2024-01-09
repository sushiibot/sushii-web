import pg from "pg";
import config from "../config";
import logger from "../logger";
import { Kysely, PostgresDialect } from "kysely";
import Cursor from "pg-cursor";
import type { DB } from "./types";

const dbLogger = logger.child({ component: "db" });

const { Pool } = pg;
const pool = new Pool({
  connectionString: config.DATABASE_URL,
  // Don't really need that many connections
  max: 5,
});

pool.on("error", (err) => {
  dbLogger.error(err, "pg pool error");
});

const db = new Kysely<DB>({
  // PostgresDialect requires the Cursor dependency
  dialect: new PostgresDialect({
    pool,
    cursor: Cursor,
  }),
});

dbLogger.info("pg connected");

export default db;
