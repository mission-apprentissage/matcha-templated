const express = require("express");
const { Formulaire } = require("../../common/model");
const tryCatch = require("../middlewares/tryCatchMiddleware");

module.exports = () => {
  const router = express.router();

  // SAVE FORM
  router.post(
    "/",
    tryCatch(async (req, res) => {
      const { /*adresse,*/ ...form } = req.body;

      // GET GEOCODING POINT

      await Formulaire.create(form);

      return res.sendStatus(200);
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
