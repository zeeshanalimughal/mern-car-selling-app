import "./config/env";

import express, { NextFunction, Request, Response } from "express";
import logger from "./helpers/logger";
import { config } from "./config/env";
import AppError from "./errors/ApiError";
import errorHandler from "./middlewares/errorHandler";
import connectDB from "./lib/db";
import cors from "cors";
import appRouter from "./routes";
Promise.all([]).then(bootstrapServer).catch(handleServerInitError);

/**
 * Bootstraps the server
 */
function bootstrapServer() {
  const app = express();
  const PORT = config.PORT;

  // Middlewares
  app.use(express.json());
  app.use(
    cors({
      origin: config.ALLOWED_ORIGIN,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  });

  // Handle undefined routes
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Routes middleware
  app.use("/api", appRouter());

  // Global error handling middleware
  app.use(errorHandler);

  app.listen(PORT, async () => {
    logger.info(`Server listening on port ${PORT}`);
    // Connect to the database after the server starts
    await connectDB();
  });
}

/**
 * Handles server initialization error
 * @param e The error that occurred during server initialization
 */
function handleServerInitError(e: unknown) {
  logger.error("Error initializing server:", e);
}

// Handle uncaught exceptions and rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});
