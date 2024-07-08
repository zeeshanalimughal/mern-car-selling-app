import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";

export const authController = {
  /**
   * @route POST /v1/auth/login
   * @desc Login route
   */
  login: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  ),

  /**
   * @route POST /v1/auth/register
   * @desc Register route
   * */
  register: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  ),
};
