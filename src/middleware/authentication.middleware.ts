import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/user.repository";
import { User } from "../models/user.model";

interface ExtendedRequest extends Request {
  user?: User;
}

const authenticationMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.headers["x-user-id"] as string;

  try {
    if (!userId) {
      res.status(401).json({ error: "Unauthorized - User ID not provided" });
    } else {
      const userRepository = new UserRepository();
      const user = await userRepository.findById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authenticationMiddleware;
