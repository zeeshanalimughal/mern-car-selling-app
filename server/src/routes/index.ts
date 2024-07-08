import express from "express";

import auth from "./auth.route";
import test from "./test.route";

const router = express.Router();

export default (): express.Router => {
  test(router);
  auth(router);
  return router;
};
