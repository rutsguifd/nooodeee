import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUserById: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.params.id;

    try {
      const user = await this.userService.getUserById(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createUser: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const newUser = req.body;

    try {
      const createdUser = await this.userService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateUser: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
      const user = await this.userService.updateUser({
        ...updatedUser,
        id: userId,
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  softDeleteUser: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.params.id;

    try {
      const result = await this.userService.softDeleteUser(userId);

      if (result) {
        res.status(200).json({ message: "User soft-deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error soft-deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default UserController;
