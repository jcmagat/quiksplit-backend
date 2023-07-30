import { Request, Response } from "express";
import pool from "../database/index.js";

const getUsers = async (_: Request, res: Response) => {
  // TODO: remove - only for testing

  pool
    .query("SELECT * FROM user_")
    .then((result) => {
      return res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const query = {
    text: "INSERT INTO user_(username_) VALUES($1) RETURNING *",
    values: [username],
  };

  pool
    .query(query)
    .then((result) => {
      return res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

const deleteUser = async (req: Request, res: Response) => {
  // TODO: add auth

  const { id } = req.params;

  const query = {
    text: "DELETE FROM user_ WHERE id_ = $1 RETURNING *",
    values: [id],
  };

  pool
    .query(query)
    .then((result) => {
      return res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

export default { getUsers, createUser, deleteUser };
