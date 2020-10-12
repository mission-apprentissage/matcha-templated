const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const Joi = require("joi");
const { Questionnaire } = require("../../common/model");
const logger = require("../../common/logger");
const boom = require("boom");
const { Client } = require("@elastic/elasticsearch");
const { level } = require("../../common/logger");
const client = new Client({
  node: "https://tables-correspondances-recette.apprentissage.beta.gouv.fr/api/es/search/",
  // node: "https://tables-correspondances-recette.apprentissage.beta.gouv.fr/api/",
});

/**
 * Schema for validation
 */
const questionnaireSchema = Joi.object({
  questionnaire_id: Joi.string(),
  user: Joi.object({
    prenom: Joi.string(),
    nom: Joi.string(),
    email: Joi.string(),
    dateNaissance: Joi.date(),
  }),
  mobilite: Joi.object({
    commune: Joi.string(),
    permis: Joi.string(),
    distance: Joi.string(),
  }),
  voeux: Joi.array().items({
    code_voeux: Joi.string(),
    formation: Joi.string(),
    metier: Joi.string(),
    choix: Joi.boolean(),
    voeux_manuel: Joi.boolean(),
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

      const toAdd = new Questionnaire({
        user_id: req.body.user_id,
        voeux: req.body.voeux,
        experiences: req.body.experiences,
        activites: req.body.activites,
        recommandations: req.body.recommandations,
      });

      await toAdd.save();
      res.json(toAdd);
    })
  );

  /**
   * Recherche d'une formation sur l'elastic search
   * https://tables-correspondances-recette.apprentissage.beta.gouv.fr/api/es/search/bcnformationdiplome/_search
   */
  router.post(
    "/search",
    tryCatch(async (req, res) => {
      const { search_term, level } = req.body;
      const { body } = await client.search({
        index: "bcnformationdiplome",
        body: {
          query: {
            bool: {
              must: {
                multi_match: {
                  query: search_term,
                  fields: ["LIBELLE_LONG_200^10", "LIBELLE_STAT_33^7"],
                  type: "phrase_prefix",
                  operator: "or",
                },
              },
              // filter on level (BTS, CAP, BEP, etc....)
            },
          },
        },
      });
      if (body) {
        res.json(body.hits);
      } else {
        throw boom.badRequest("No result returned from the elastic search");
      }
    })
  );

  /**
   * Update an item by id
   */
  router.post(
    "/items/:questionnaireId",
    tryCatch(async (req, res) => {
      const { questionnaireId } = req.params;
      const item = req.body;
      const exist = await Questionnaire.findOne({ questionnaire_id: questionnaireId });
      if (!exist) {
        logger.info("Adding new questionnaire: ", questionnaireId);
        await Questionnaire.create({
          questionnaire_id: questionnaireId,
          candidat: item.candidat,
          voeux: item.voeux,
          experiences: item.experiences,
          activites: item.activites,
          recommandations: item.recommandations,
          mobilite: item.mobilite,
        }).then((result) => res.json(result));
      } else {
        logger.info("Updating questionnaire: ", questionnaireId, item);
        await Questionnaire.findOneAndUpdate(
          { questionnaire_id: questionnaireId },
          {
            candidat: item.candidat,
            voeux: item.voeux,
            experiences: item.experiences,
            activites: item.activites,
            recommandations: item.recommandations,
            mobilite: item.mobilite,
          },
          { new: true }
        ).then((result) => res.json(result));
      }
      // await questionnaireSchema.validateAsync(req.body, { abortEarly: false });
    })
  );

  return router;
};
