const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const psupModule = require("../../logic/parcourSupModule");
const boom = require("boom");

/**
 * Sample entity route module for GET / POST / PUT / DELETE entity
 */
module.exports = () => {
  const router = express.Router();

  /**
   * Get item by id
   */
  router.get(
    "/items/:id",
    tryCatch(async (req, res) => {
      const retrievedData = psupModule.data.find((item) => item.G_CN_COD === req.params.id);
      if (retrievedData) {
        res.json(retrievedData);
      } else {
        throw boom.badRequest("Identifiant invalide");
      }
    })
  );

  return router;
};
