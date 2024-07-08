import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { carSchema } from "../validators/carValidators";

export const validateCar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedData = {
      carModel: req.body.carModel,
      price: parseFloat(req.body.price),
      phone: req.body.phone,
      city: req.body.city,
      copies: parseInt(req.body.copies, 10),
      pictures: Array.isArray(req.files?.pictures || [])
        ? req.files?.pictures
        : [req.files?.pictures],
    };

    carSchema.parse(parsedData);

    req.body = parsedData;

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
