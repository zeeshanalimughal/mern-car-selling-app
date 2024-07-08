import { Router } from "express";
import { carController } from "../controllers/car.controller";
import { validate } from "../middlewares/validate";
import { carSchema } from "../validators/carValidators";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { validateCar } from "../middlewares/validateCar";

export default (router: Router) => {
  /**
   * @route POST /cars
   * @desc Create a car
   */
  router.post(
    "/cars/create",
    isAuthenticated,
    validateCar,
    carController.create
  );

  /**
   * @route GET /cars
   * @desc Get all cars
   */
  router.get("/cars", isAuthenticated, carController.getAll);
};
