import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

// Define the shape of the decoded token
interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized: Missing token" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

const adminAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.user?.role;
  if (userRole !== "admin") {
    res.status(403).json({
      error: "Forbidden: Only admin users are allowed to perform this action",
    });
    return;
  }
  next();
};

export { authenticationMiddleware, adminAuthorizationMiddleware };
