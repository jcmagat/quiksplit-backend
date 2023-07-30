import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new pg.Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

export default pool;
