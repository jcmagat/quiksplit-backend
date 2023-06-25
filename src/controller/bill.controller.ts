import { Request, Response } from "express";
import Bill from "../entity/bill.entity.js";
import { AppDataSource } from "../data-source.js";

const getBills = async (_: Request, res: Response) => {
  // TODO: add auth. Only show bills of authenticated user

  const bills = await AppDataSource.getRepository(Bill).find();
  res.send(bills);
};

const createBill = async (req: Request, res: Response) => {
  // TODO: add auth
};

export default { getBills, createBill };
