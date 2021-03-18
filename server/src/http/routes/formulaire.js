const express = require("express");
const logger = require("../../common/logger");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = () => {
  const router = express.Router();

  // GET FORM
  router.get(
    "/:_id",
    tryCatch(async (req, res) => {
      // await Formulaire.create({ nom: "BARNOIN", prenom: "KEVIN" });
      console.log(req.params);
      let { _id } = req.params;
      let result = await Formulaire.findById(_id).lean();
      res.json(result);
    })
  );

  // SAVE FORM
  router.post(
    "/:_id",
    tryCatch(async (req, res) => {
      const form = req.body;
      const { _id } = req.params;

      console.log(form, _id);

      try {
        // const { features } = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${form.adresse}`);

        // let geopoints = features.geometry.coordinates.split(",");
        // let coords = `${geopoints[0]},${geopoints[1]}`;

        // form.coordonnees_geo = coords;

        await Formulaire.findByIdAndUpdate({ _id }, form);

        return res.sendStatus(200);
      } catch (error) {
        logger.error(error);

        return res.status(400).json({ message: error });
      }
    })
  );

  // SEND MAIL

  return router;
};
