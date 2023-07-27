import express from "express";
import billController from "../controller/bill.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.authenticateToken, billController.getBills)
  .post(authMiddleware.authenticateToken, billController.createBill);

router.route("/:id").get(billController.getBill);

router
  .route("/:id/members")
  .get(billController.getMembers)
  .post(billController.addMember);

export default router;
