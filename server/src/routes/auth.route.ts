import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRouter: Router = Router();

export default (router: Router) => {
  /**
   * @route POST /v1/auth/register
   * @desc Register route
   * @access Public
   * */
  router.post("/auth/register", authController.register);

  /**
   * @route POST /v1/auth/login
   * @desc Login route
   * @access Public
   */
  router.post("/auth/login", authController.login);
};
