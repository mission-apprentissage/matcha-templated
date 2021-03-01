const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const Joi = require("joi");
const { Questionnaire } = require("../../common/model");
const logger = require("../../common/logger");
const boom = require("boom");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://tables-correspondances-recette.apprentissage.beta.gouv.fr/api/es/search/",
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
      /**
       * TODO :
       *  - Only save data filled from the form
       *  - Avoid passing steps if step id not completed from the FRONT
       */
      const filtered = allData.filter(
        (data) => data && data.questionnaire_id !== "null" && data.candidat.prenom !== null
      );
      return res.json(filtered);
    })
  );

  router.get(
    "/item/:questionnaireId",
    tryCatch(async (req, res) => {
      const { questionnaireId } = req.params;
      const data = await Questionnaire.find({ questionnaire_id: questionnaireId });
      if (data) {
        res.json(data);
      } else {
        throw boom.badRequest("Identifiant invalide");
      }
    })
  );

  /**
   * Get item by mongodb _id (used for admin page)
  router.get(
    "/items/:id",
    tryCatch(async (req, res) => {
      const itemId = req.params.id;
      const retrievedData = await Questionnaire.findById(itemId);
      if (retrievedData) {
        res.json([retrievedData]);
      } else {
        throw boom.badRequest("Identifiant invalide");
      }
    })
  );
  */

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
   * Update an item by id
   */
  router.post(
    "/items/:questionnaireId",
    tryCatch(async (req, res) => {
      const { questionnaireId } = req.params;
      const item = req.body;

      const qna = await Questionnaire.findOneAndUpdate(
        { questionnaire_id: questionnaireId },
        {
          candidat: item.candidat,
          voeux: item.voeux,
          experiences: item.experiences,
          activites: item.activites,
          recommandations: item.recommandations,
          mobilite: item.mobilite,
        },
        { new: true, upsert: true }
      );

      return res.json(qna);
    })
  );

  router.get(
    "/export",
    tryCatch(async (req, res) => {
      const data = await Questionnaire.find();
      const filtered = data.filter((data) => data && data.questionnaire_id !== "null" && data.candidat.prenom !== null);
      res.json(filtered);
    })
  );

  /**
   * Recherche d'une formation sur l'elastic search
   * https://tables-correspondances-recette.apprentissage.beta.gouv.fr/api/es/search/bcnformationdiplome/_search
   * Filtrer les résultats :
   * - DATE_FERMETURE > 31/08/YYYY, ou YYYY est l'année en cours
   * - DATE_FERMETURE est vide (La formation est active)
   */
  router.post(
    "/search",
    tryCatch(async (req, res) => {
      const { search_term, level } = req.body;
      const query = {
        size: 1000,
        query: {
          bool: {
            must: {
              match: {
                LIBELLE_LONG_200: {
                  query: search_term,
                },
              },
            },
          },
        },
      };
      if (level) {
        query.query.bool.filter = [
          {
            match: {
              LIBELLE_COURT: {
                query: level,
              },
            },
          },
        ];
      }
      const response = await client.search({
        index: "bcnformationdiplome",
        body: query,
      });

      const filtered = response.body.hits.hits.filter(
        (hit) => hit._source.DATE_FERMETURE === "" || hit._source.DATE_FERMETURE > "DATEDUJOUR"
      );

      console.log(response.body.hits.hits.length);
      console.log(filtered.length);

      // res.json(response.body.hits);
      res.json(filtered);
    })
  );

  return router;
};
