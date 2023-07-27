import { Request, Response } from "express";
import Bill from "../entity/bill.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../data-source.js";

const getBills = async (req: Request, res: Response) => {
  const user = req.user;

  // TODO: fix

  // AppDataSource.getRepository(Bill)
  //   .find({
  //     where: {
  //       members: user as User,
  //     },
  //   })
  //   .then((bills) => {
  //     return res.send(bills);
  //   })
  //   .catch((error) => {
  //     console.error(error);

  //     // TODO: check the type of error and set status and error accordingly

  //     return res.status(400).send({
  //       error: "Something went wrong",
  //     });
  //   });
};

const getBill = async (req: Request, res: Response) => {
  const { id } = req.params;

  AppDataSource.getRepository(Bill)
    .find({
      where: { id: id },
    })
    .then((bill) => {
      return res.send(bill);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

const createBill = async (req: Request, res: Response) => {
  const user = req.user;

  const { name } = req.body;

  const bill = new Bill();
  bill.name = name;
  bill.members = [user] as User[];

  AppDataSource.manager
    .save(bill)
    .then((newBill) => {
      return res.send(newBill);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

const getMembers = async (req: Request, res: Response) => {
  const { id } = req.params;

  AppDataSource.getRepository(Bill)
    .findOne({ where: { id }, relations: { members: true } })
    .then((bill) => {
      if (!Array.isArray(bill?.members)) return res.send([]);

      return res.send(bill?.members);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
};

const addMember = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { username, firstName, lastName } = req.body;

  if (!username) {
    try {
      // Create a new user
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;

      const newUser = await AppDataSource.manager.save(user);

      // Add new user as a member of the bill
      const bill = await AppDataSource.createQueryBuilder()
        .relation(Bill, "members")
        .of(id)
        .add(newUser);

      console.log(bill);

      return res.send(bill);
    } catch (error) {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    }
  }

  // TODO: Username is provided, add the existing user
};

export default {
  getBills,
  getBill,
  createBill,
  getMembers,
  addMember,
};
