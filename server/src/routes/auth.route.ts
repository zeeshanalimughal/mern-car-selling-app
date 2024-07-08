import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/authValidators";

export default (router: Router) => {
  /**
   * @route POST /auth/register
   * @desc Register route
   * @access Public
   * */
  router.post(
    "/auth/register",
    validate(registerSchema),
    authController.register
  );

  /**
   * @route POST /auth/login
   * @desc Login route
   * @access Public
   */
  router.post("/auth/login", validate(loginSchema), authController.login);
};
