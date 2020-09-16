const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const psupModule = require("../../logic/parcourSupModule");
const { Questionnaire, User } = require("../../common/model");

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
      const retrievedPsupUser = psupModule.data.find((item) => item.G_CN_COD === req.params.id);
      const retrievedUser = await User.findOne({ parcoursup_id: `${req.params.id}` });

      if (!retrievedPsupUser) {
        throw boom.badRequest("Utilisateur Parcoursup non trouvé dans les données Parcoursup");
      }

      if (!retrievedUser) {
        throw boom.badRequest("Utilisateur Parcoursup non trouvé en base");
      }

      const retrievedQuestionnaire = await Questionnaire.findOne({ user_id: retrievedUser._id });

      res.json({
        parcoursup_user: retrievedPsupUser,
        questionnaire: retrievedQuestionnaire ? retrievedQuestionnaire : null,
      });
    })
  );

  return router;
};
