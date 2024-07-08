import express from "express";

import auth from "./auth.route";
import test from "./test.route";
import carRoute from "./car.route";
const router = express.Router();

export default (): express.Router => {
  test(router);
  auth(router);
  carRoute(router);
  return router;
};
