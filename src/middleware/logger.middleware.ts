import { NextFunction, Request, Response } from "express";
import loggerService from "../services/logger.service";

interface ResponseWithOn extends Response {
  on(event: string, listener: Function): this;
}

const NODE_ENV = process.env.NODE_ENV;

function loggerMiddleware(
  req: Request,
  res: ResponseWithOn,
  next: NextFunction
) {
  if (NODE_ENV === "test") {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const logEntry = {
        level: "info",
        message: `${req.method} ${req.path} - ${duration}ms`,
        timestamp: new Date().toUTCString(),
        method: req.method,
        path: req.path,
        duration: `${duration}ms`,
      };
      loggerService.log(logEntry);
    });
  } else if (NODE_ENV !== "production") {
    console.error(`WRONG NODE_ENV VARIABLE: ${NODE_ENV}`);
  }
  next();
}

export default loggerMiddleware;
