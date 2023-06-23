import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "juan",
  password: "jcm2441",
  database: "quiksplit_db",
  synchronize: true,
  logging: ["error"],
  entities: ["src/entity/**/*.ts"],
  subscribers: [],
  migrations: [],
});
