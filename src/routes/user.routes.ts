import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController();

router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", userController.createUser);
router.delete("/api/users/:id", userController.softDeleteUser);

export default router;
