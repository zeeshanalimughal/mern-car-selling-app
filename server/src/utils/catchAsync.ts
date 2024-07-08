import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 *  Wraps an async function to catch any errors that occur
 * @param fn  The async function to wrap
 * @returns  A RequestHandler function that catches any errors that occur
 */
const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
