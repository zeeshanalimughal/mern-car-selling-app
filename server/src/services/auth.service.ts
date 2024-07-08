import { NextFunction } from "express";
import AppError from "../errors/ApiError";
import { User } from "../models";
import { generateToken } from "../utils/jwtUtil";
import {
  AuthLoginRequestBody,
  AuthRegisterBody,
  IAuthLoginResponse,
  IAuthRegisterResponse,
} from "../interfaces/auth.interface";
import UserService from "./user.service";

/**
 * Service class for authentication.
 * @class AuthService
 * @static login
 * @static register
 */
export default class AuthService {
  /**
   * @route POST /auth/login
   * @desc login route for user to login
   */
  static async login(body: AuthLoginRequestBody): Promise<IAuthLoginResponse> {
    const { email, password } = body;

    if (!email || !password) {
      throw new AppError("Please provide an email and password", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = generateToken({ id: user._id }, "1d");

    return {
      user: { id: user._id?.toString(), name: user.name, email: user.email },
      token,
    };
  }

  /**
   * @route POST /auth/register
   * @desc Register route for user to register
   */
  static async register(
    body: AuthRegisterBody
  ): Promise<IAuthRegisterResponse> {
    const { email, password, name } = body;

    if (!email || !password || !name) {
      throw new AppError("Please provide an email, password and name", 400);
    }

    const emailExists = await User.emailExists(email);
    if (emailExists) {
      throw new AppError("Email already exists", 400);
    }

    await UserService.createUser(body);
    return {
      status: 201,
      message: "User registered successfully",
    };
  }
}
