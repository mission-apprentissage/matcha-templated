const express = require("express");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

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

  return router;
};
