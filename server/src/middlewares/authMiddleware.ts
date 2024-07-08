// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { config } from "../config/env";
import { verifyToken } from "../utils/jwtUtil";

const secretKey = config.JWT_SECRET;

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided or invalid format" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token as string) as { id: string };

    const user = await User.findById(decoded.id, { email: 1 }).lean().exec();
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    req.user = {
      id: user._id?.toString(),
      email: user.email,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
