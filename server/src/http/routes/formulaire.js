const express = require("express");
const { getElasticInstance } = require("../../common/esClient");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

const esClient = getElasticInstance();

module.exports = () => {
  const router = express.Router();

  /**
   * Get FORM
   */
  router.get(
    "/:id_form",
    tryCatch(async (req, res) => {
      let { id_form } = req.params;
      let result = await Formulaire.findOne({ id_form }).lean();

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
        return res.status(400).json({ error: "Arguments is missing (distance, lat, lon, romes)" });
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

      return res.json(result.body.hits.hits);
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

      await Formulaire.findOneAndUpdate({ id_form }, form, { new: true });

      //TODO : send thank you mail

      return res.sendStatus(200);
    })
  );

  return router;
};
