import express from "express";
import billController from "../controller/bill.controller.js";

const router = express.Router();

router.route("/").get(billController.getBills);

export default router;
