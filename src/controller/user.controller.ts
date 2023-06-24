import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/user.entity.js";

const getUsers = async (_: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find();
  res.send(users);
};

const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  const newUser = { username };

  const results = await AppDataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values(newUser)
    .returning("*")
    .execute();

  return res.send(results.raw[0]);
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
