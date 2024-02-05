"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_service_1 = __importDefault(require("./services/logger.service"));
const PORT = process.env.PORT || 3000;
const server = app_1.default.listen(PORT, () => {
    logger_service_1.default.info(`Server is running on port ${process.env.PORT}`);
});
const shutdownServer = () => {
    console.log("Received termination signal. Shutting down server...");
    server.close(() => {
        console.log("Server gracefully closed");
        process.exit(0);
    });
};
process.on("SIGINT", shutdownServer);
process.on("SIGTERM", shutdownServer);
