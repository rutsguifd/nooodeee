import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUserById = (req: Request, res: Response): void => {
    const userId = req.params.id;
    const user = this.userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  };

  createUser = (req: Request, res: Response): void => {
    const newUser = req.body;

    const createdUser = this.userService.createUser(newUser);

    res.status(201).json(createdUser);
  };

  updateUser = (req: Request, res: Response): void => {
    const userId = req.params.id;
    const updatedUser = req.body;

    const existingUser = this.userService.getUserById(userId);

    if (existingUser) {
      const result = this.userService.updateUser({
        ...existingUser,
        ...updatedUser,
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: "Failed to update user" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  };

  softDeleteUser = (req: Request, res: Response): void => {
    const userId = req.params.id;

    if (this.userService.softDeleteUser(userId)) {
      res.status(200).json({ message: "User soft-deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  };
}

export default UserController;
