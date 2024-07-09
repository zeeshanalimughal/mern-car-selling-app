import "./config/env";

import express, { NextFunction, Request, Response } from "express";
import logger from "./helpers/logger";
import { config } from "./config/env";
import AppError from "./errors/ApiError";
import errorHandler from "./middlewares/errorHandler";
import connectDB from "./lib/db";
import cors from "cors";
import appRouter from "./routes/index";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from "path";
Promise.all([]).then(bootstrapServer).catch(handleServerInitError);

/**
 * Bootstraps the server
 */
function bootstrapServer() {
  const app = express();
  const PORT = config.PORT;

  // Middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: `${config.ALLOWED_ORIGIN}`,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
  app.use(express.static(path.join(process.cwd(), "src/public")));
  app.use(fileUpload());

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  });

  // Routes middleware
  app.use("/api", appRouter());

  // Handle undefined routes
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

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
