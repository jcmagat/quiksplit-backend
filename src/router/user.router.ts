import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

export default router;
