const express = require("express");
// const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = () => {
  const router = express.Router();

  // router.get(
  //   "/",
  //   tryCatch(async (req, res) => {})
  // );

  // router.post(
  //   "/",
  //   tryCatch(async (req, res) => {})
  // );

  // router.put(
  //   "/:userId",
  //   tryCatch(async (req, res) => {})
  // );

  // router.delete(
  //   "/:userId",
  //   tryCatch(async (req, res) => {})
  // );

  return router;
};
