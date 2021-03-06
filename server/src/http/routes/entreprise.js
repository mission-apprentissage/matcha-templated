const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const axios = require("axios");
const config = require("config");

module.exports = () => {
  const router = express.Router();

  /**
   * Get establishment info from SIRET
   */
  router.get(
    "/:siret",
    tryCatch(async (req, res) => {
      const siret = req.params.siret;

      if (!siret) {
        res.status(400).json({ error: true, message: "Le numéro siret est obligatoire" });
      }

      try {
        const result = await axios.get(
          `https://entreprise.api.gouv.fr/v2/etablissements/${siret}?context=completionFormulaire&recipient=MissionApprentissage(DINUM)&object=matcha`,
          {
            headers: {
              Authorization: `Bearer ${config.apiEntreprise}`,
            },
          }
        );

        let { adresse, libelle_naf } = result.data.etablissement;

        let company = {
          raison_sociale: adresse.l1,
          libelle_naf: libelle_naf,
          adresse: `${adresse.l4}, ${adresse.l6}`,
        };

        return res.json(company);
      } catch (error) {
        return res
          .status(400)
          .json({ error: true, message: "l'API entreprise a retourné une erreur, le siret doit être érronée" });
      }
    })
  );

  return router;
};
