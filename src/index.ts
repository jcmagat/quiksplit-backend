import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.js";
import userRouter from "./router/user.router.js";
import billRouter from "./router/bill.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) =>
    console.error("Error during Data Source initialization:", err)
  );

app.use(express.json());

// ========== Routes ==========
app.use("/users", userRouter);
app.use("/bills", billRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
