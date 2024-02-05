import { Request, Response } from "express";
import { RegisteredUserDocument } from "../models/user.model";
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

  softDeleteUser: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.params.id;

    try {
      const result = await this.userService.deleteUser(userId);

      if (result) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, role } = req.body;

      const tokenOrError = await this.userService.signUp({
        email,
        password,
        role,
      } as RegisteredUserDocument);

      if (typeof tokenOrError === "string") {
        res.status(201).json({ token: tokenOrError });
      } else if (tokenOrError instanceof Error) {
        res.status(409).json({ error: tokenOrError.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await this.userService.signIn({ email, password });
    if (!token) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    res.status(200).json({ token });
  };
}

export default UserController;
