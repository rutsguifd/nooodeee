import express from "express";
import UserController from "../controllers/user.controller";
import adminMiddleware from "../middleware/auth.middleware";

const router = express.Router();
const userController = new UserController();

router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", userController.createUser);
router.delete("/api/users/:id", adminMiddleware, userController.softDeleteUser);

router.post("/api/register", userController.signUp);
router.post("/api/login", userController.signIn);

export default router;
