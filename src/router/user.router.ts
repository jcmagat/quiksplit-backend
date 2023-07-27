import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router.route("/:id").delete(userController.deleteUser);

export default router;
