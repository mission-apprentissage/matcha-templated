const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const Joi = require("joi");
const { Questionnaire } = require("../../common/model");
const logger = require("../../common/logger");
const boom = require("boom");

/**
 * Schema for validation
 */
const questionnaireSchema = Joi.object({
  user_id: Joi.string(),
  voeux: Joi.array().items({
    code_voeux: Joi.string(),
    formation: Joi.string(),
    choix: Joi.boolean(),
  }),
  experiences: Joi.array().items({
    nom: Joi.string(),
    taches: Joi.array().items(Joi.string()),
    nom_entreprise: Joi.string(),
    adresse_entreprise: Joi.string(),
    date_debut: Joi.date(),
    date_fin: Joi.date(),
  }),
  activites: Joi.array().items({
    nom: Joi.string(),
    periodicite: Joi.string(),
    criteres: Joi.array().items(Joi.string()),
  }),
  recommandations: Joi.array().items({
    nom: Joi.string(),
    prenom: Joi.string(),
    email: Joi.string(),
    telephone: Joi.string(),
    role: Joi.string(),
  }),
});

/**
 * Sample entity route module for GET / POST / PUT / DELETE entity
 */
module.exports = () => {
  const router = express.Router();

  /**
   * Get all items
   * */
  router.get(
    "/items",
    tryCatch(async (req, res) => {
      const allData = await Questionnaire.find({});
      return res.json(allData);
    })
  );

  /**
   * Get item by id
   */
  router.get(
    "/items/:id",
    tryCatch(async (req, res) => {
      const itemId = req.params.id;
      const retrievedData = await Questionnaire.findById(itemId);
      if (retrievedData) {
        res.json(retrievedData);
      } else {
        throw boom.badRequest("Identifiant invalide");
      }
    })
  );

  /**
   * Add/Post an item validated by schema
   */
  router.post(
    "/items",
    tryCatch(async (req, res) => {
      await questionnaireSchema.validateAsync(req.body, { abortEarly: false });

      const item = req.body;
      logger.info("Adding new questionnaire: ", item);

      const sampleToAdd = new Questionnaire({
        user_id: req.body.user_id,
        voeux: req.body.voeux,
        experiences: req.body.experiences,
        activites: req.body.activites,
        recommandations: req.body.recommandations,
      });

      await sampleToAdd.save();

      // return updated list
      res.json(sampleToAdd);
    })
  );

  return router;
};
