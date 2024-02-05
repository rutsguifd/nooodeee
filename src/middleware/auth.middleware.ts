import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
      const userRole = decodedToken.role;

      if (userRole === "ADMIN") {
        next();
      } else {
        res.status(403).json({
          error: "Access Forbidden: Only admins can perform this action.",
        });
      }
    } catch (error) {
      res.status(401).json({ error: "Unauthorized: Invalid token." });
    }
  } else {
    res.status(401).json({ error: "Unauthorized: Token missing." });
  }
};

export default adminMiddleware;
