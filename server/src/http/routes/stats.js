const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = ({ stats }) => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await stats.getAllStatistiques();
      return res.json(result);
    })
  );

  return router;
};
