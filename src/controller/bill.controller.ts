import { Request, Response } from "express";
import Bill from "../entity/bill.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../data-source.js";
import authService from "../service/auth.service.js";

const getBills = async (req: Request, res: Response) => {
  const { isValid, user } = authService.verifyToken(req.cookies.access_token);

  if (!isValid)
    return res.status(401).send({
      error: "Not authenticated",
    });

  AppDataSource.getRepository(Bill)
    .find({
      where: {
        user: user as User,
      },
    })
    .then((bills) => {
      return res.send(bills);
    })
    .catch((error) => {
      console.error(error);

      // TODO: check the type of error and set status and error accordingly

      return res.status(400).send({
        error: "Something went wrong",
      });
    });
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
  const { isValid, user } = authService.verifyToken(req.cookies.access_token);

  if (!isValid)
    return res.status(401).send({
      error: "Not authenticated",
    });

  const { name } = req.body;

  const bill = new Bill();
  bill.name = name;
  bill.user = user as User;

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

export default { getBills, getBill, createBill };
