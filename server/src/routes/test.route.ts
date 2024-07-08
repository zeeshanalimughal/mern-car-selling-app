import { Router } from "express";

export default (router: Router) => {
  /**
   * @route GET /test
   * @desc Test route
   * @access Public
   */
  router.get("/test", (req, res) => {
    console.log("Hello World!");
    res.json({ message: "Hello World!" });
  });
};
