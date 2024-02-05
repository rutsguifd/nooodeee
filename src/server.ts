import app from "./app";
import loggerService from "./services/logger.service";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  loggerService.info(`Server is running on port ${process.env.PORT}`);
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
