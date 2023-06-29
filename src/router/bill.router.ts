import express from "express";
import billController from "../controller/bill.controller.js";

const router = express.Router();

router.route("/").get(billController.getBills).post(billController.createBill);

router.route("/:id").get(billController.getBill);

export default router;
