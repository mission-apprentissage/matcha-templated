const express = require("express");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = () => {
  const router = express.Router();

  /**
   * Get FORM
   */
  router.get(
    "/:_id",
    tryCatch(async (req, res) => {
      let { formId } = req.params;
      let result = await Formulaire.findOne({ id_form: formId }).lean();

      return res.json(result);
    })
  );

  /**
   * Post FORM
   */
  router.post(
    "/:_id",
    tryCatch(async (req, res) => {
      const form = req.body;
      const { formId } = req.params;

      console.log(form, formId);

      // const { features } = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${form.adresse}`);

      // let geopoints = features.geometry.coordinates.split(",");
      // let coords = `${geopoints[0]},${geopoints[1]}`;

      // form.coordonnees_geo = coords;

      await Formulaire.findOneAndUpdate({ id_form: formId }, form, { new: true });

      //TODO : send thank you mail

      return res.sendStatus(200);
    })
  );

  return router;
};
