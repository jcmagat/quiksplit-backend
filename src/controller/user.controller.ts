import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import User from "../entity/user.entity.js";
import authService from "../service/auth.service.js";

const getUsers = async (_: Request, res: Response) => {
  // TODO: remove - only for testing

  const users = await AppDataSource.getRepository(User).find();
  res.send(users);
};

const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const user = new User();
  user.username = username;

  AppDataSource.manager
    .save(user)
    .then((newUser) => {
      const { accessToken } = authService.createToken({ id: newUser.id });

      // Set cookie
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      });

      return res.send(newUser);
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

  const results = await AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id })
    .returning("*")
    .execute();

  return res.send(results.raw[0]);
};

export default { getUsers, createUser, deleteUser };
