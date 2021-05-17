const express = require("express");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getElasticInstance } = require("../../common/esClient");
const logger = require("../../common/logger");
const config = require("config");

const esClient = getElasticInstance();

module.exports = ({ mail }) => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      let qs = req.query;
      const query = qs && qs.query ? JSON.parse(qs.query) : {};
      const page = qs && qs.page ? qs.page : 1;
      const limit = qs && qs.limit ? parseInt(qs.limit, 10) : 100;

      const result = await Formulaire.paginate(query, { page, limit, lean: true });

      return res.json({
        data: result.docs,
        pagination: {
          page: result.page,
          result_per_page: limit,
          number_of_page: result.pages,
          total: result.total,
        },
      });
    })
  );

  /**
   * Get single form
   */
  router.get(
    "/:id_form",
    tryCatch(async (req, res) => {
      const { id_form } = req.params;
      let result = await Formulaire.findOne({ id_form }).lean();

      if (!result) res.sendStatus(401);

      return res.json(result);
    })
  );

  /**
   * LBA ENDPOINT
   */
  router.get(
    "/offre/:id_offre",
    tryCatch(async (req, res) => {
      const { id_offre } = req.params;
      let result = await Formulaire.findOne({ "offres._id": id_offre });

      result.offres = result.offres.filter((x) => x._id == id_offre);

      result.events = undefined;
      result.mailing = undefined;

      return res.json(result);
    })
  );

  /**
   * LBA ENDPOINT
   */
  router.post(
    "/search",
    tryCatch(async (req, res) => {
      const { distance, lat, lon, romes } = req.body;

      if (!distance || !lat || !lon || !romes) {
        return res.status(400).json({ error: "Argument is missing (distance, lat, lon, romes)" });
      }

      const body = {
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: "offres",
                  query: {
                    match: {
                      "offres.romes": romes.join(" "),
                    },
                  },
                },
              },
            ],
            filter: [
              {
                geo_distance: {
                  distance: `${distance}km`,
                  geo_coordonnees: {
                    lat,
                    lon,
                  },
                },
              },
            ],
          },
        },
        sort: [
          {
            _geo_distance: {
              geo_coordonnees: {
                lat,
                lon,
              },
              order: "asc",
              unit: "km",
              mode: "min",
              distance_type: "arc",
              ignore_unmapped: true,
            },
          },
        ],
      };

      const result = await esClient.search({ index: "formulaires", body });

      const filtered = result.body.hits.hits.map((x) => {
        let offres = [];

        if (x._source.offres.length === 0) {
          return;
        }

        x._source.mailing = undefined;
        x._source.events = undefined;

        x._source.offres.forEach((o) => {
          if (romes.some((item) => o.romes.includes(item))) {
            offres.push(o);
          }
        });
        x._source.offres = offres;
        return x;
      });

      return res.json(filtered);
    })
  );

  /**
   * Post FORM
   */
  router.post(
    "/:id_form",
    tryCatch(async (req, res) => {
      const form = req.body;
      const { id_form } = req.params;

      /**
       * Create new formulaire and send email
       */
      if (id_form == "undefined") {
        const newForm = await Formulaire.create(form);

        let { _id, id_form, raison_sociale, email } = newForm;

        const payload = {
          sender: {
            name: "Mission interministérielle pour l'apprentissage",
            email: "charlotte.lecuit@beta.gouv.fr",
          },
          to: [
            {
              name: `${raison_sociale}`,
              email: `${email}`,
            },
          ],
          replyTo: {
            name: "Charlotte Lecuit",
            email: "charlotte.lecuit@beta.gouv.fr",
          },
          subject: `Accédez à vos offres déposées sur Matcha`,
          templateId: 178,
          tags: ["matcha-nouveau-formulaire"],
          params: {
            URL: `${config.publicUrl}/formulaire/${id_form}`,
          },
        };

        const { body: result } = await mail.sendmail(payload);

        const message = {
          campagne: "matcha-nouveau-formulaire",
          code: result.code ?? null,
          message: result.message ?? null,
          messageId: result.messageId ?? null,
        };

        if (!result.messageId) {
          logger.info(`error : ${message.code} —— ${message.message} — ${email}`);
        }

        await Formulaire.findByIdAndUpdate(_id, { $push: { mailing: message } });

        return res.json(result);
      }

      /**
       * Update existing formulaire
       */
      await Formulaire.findOneAndUpdate({ id_form }, form);

      return res.sendStatus(200);
    })
  );

  return router;
};
