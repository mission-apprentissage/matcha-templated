const axios = require("axios");
const express = require("express");
const logger = require("../../common/logger");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = () => {
  const router = express.router();

  // SAVE FORM
  router.post(
    "/",
    tryCatch(async (req, res) => {
      const form = req.body;

      try {
        const { features } = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${form.adresse}`);

        let geopoints = features.geometry.coordinates.split(",");
        let coords = `${geopoints[0]},${geopoints[1]}`;

        form.coordonnees_geo = coords;

        await Formulaire.create(form);

        return res.sendStatus(200);
      } catch (error) {
        logger.error(error);

        return res.status(400).json({ message: error });
      }
    })
  );

  // GET FORM
  router.get(
    "/",
    tryCatch(async () => {})
  );

  // SEND MAIL

  return router;
};
