import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc: Record<string, string>, curr) => {
            acc[curr.path.join(".")] = curr.message;
            return acc;
          },
          {}
        );

        return res.status(400).json({
          message: "Validation error",
          errors: formattedErrors,
        });
      }
      next(error);
    }
  };
