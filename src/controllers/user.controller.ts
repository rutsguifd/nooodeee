import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.userService.registerUser(email, password);
      res.status(201).json({ token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.userService.loginUser(email, password);
      if (!token) {
        res.status(401).json({ error: "Unauthorized: Invalid credentials" });
        return;
      }
      res.json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
}

export default UserController;
