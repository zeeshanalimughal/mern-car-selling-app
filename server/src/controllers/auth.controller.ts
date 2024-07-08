import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AuthService from "../services/auth.service";
import {
  AuthLoginRequestBody,
  AuthRegisterBody,
} from "../interfaces/auth.interface";

export const authController = {
  /**
   * @route POST /auth/login
   * @desc Login route
   */
  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await AuthService.login(req.body as AuthLoginRequestBody);
    return res.status(200).json(response);
  }),

  /**
   * @route POST /auth/register
   * @desc Register route
   * */
  register: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const response = await AuthService.register(req.body as AuthRegisterBody);
      return res.status(201).json(response);
    }
  ),
};
