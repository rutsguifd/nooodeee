"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = __importDefault(require("../services/logger.service"));
const NODE_ENV = process.env.NODE_ENV;
function loggerMiddleware(req, res, next) {
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
            logger_service_1.default.log(logEntry);
        });
    }
    else if (NODE_ENV !== "production") {
        console.error(`WRONG NODE_ENV VARIABLE: ${NODE_ENV}`);
    }
    next();
}
exports.default = loggerMiddleware;
