import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
