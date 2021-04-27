const express = require("express");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getElasticInstance } = require("../../common/esClient");

const esClient = getElasticInstance();

module.exports = () => {
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
   * Get FORM
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

      if (id_form == "undefined") {
        const result = await Formulaire.create(form);
        return res.json(result);
      }

      await Formulaire.findOneAndUpdate({ id_form }, form);

      //TODO : send thank you mail

      return res.sendStatus(200);
    })
  );

  return router;
};
