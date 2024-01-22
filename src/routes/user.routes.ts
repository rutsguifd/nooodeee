import express from "express";
import UserController from "../controllers/user.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const userController = new UserController();

router.get(
  "/api/users/:id",
  authenticationMiddleware,
  userController.getUserById
);
router.post("/api/users", userController.createUser);
router.put(
  "/api/users/:id",
  authenticationMiddleware,
  userController.updateUser
);
router.delete(
  "/api/users/:id",
  authenticationMiddleware,
  userController.softDeleteUser
);

export default router;
