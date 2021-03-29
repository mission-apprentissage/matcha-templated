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

  /**
   * LBA ENDPOINT
   */
  router.post(
    "/_search",
    tryCatch(async (req, res) => {
      const { distance, lat, lon, romes } = req.body;

      let mustTerm = [];

      if (romes)
        mustTerm.push({
          match: {
            offres: romes.join(" "),
          },
        });

      // not used as of now
      // if (romeDomain)
      //   mustTerm.push({
      //     multi_match: {
      //       query: romeDomain,
      //       fields: ["rome_codes"],
      //       type: "phrase_prefix",
      //       operator: "or",
      //     },
      //   });

      // TODO : normalize later is needed
      // if (diploma)
      //   mustTerm.push({
      //     match: {
      //       niveau: diploma,
      //     },
      //   });

      const payload = {
        query: {
          bool: {
            must: mustTerm,
            filter: {
              geo_distance: {
                distance: `${distance}km`,
                geo_coordonnees: {
                  lat,
                  lon,
                },
              },
            },
          },
        },
        sort: [
          {
            _geo_distance: {
              geo_coordonnees: [parseFloat(lat), parseFloat(lon)],
              order: "asc",
              unit: "km",
              mode: "min",
              distance_type: "arc",
              ignore_unmapped: true,
            },
          },
        ],
      };

      const result = await esClient.search(payload);

      return res.json(result.body);
    })
  );

  return router;
};
