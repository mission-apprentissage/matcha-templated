const { runScript } = require("../../scriptWrapper");
const { Formulaire } = require("../../../common/model");

runScript(async () => {
  const updated = await Formulaire.updateMany(
    { raison_sociale_mandataire: { $exists: true } },
    {
      $unset: {
        siret_mandataire: 1,
        raison_sociale_mandataire: 1,
        adresse_mandataire: 1,
        geo_coordonnees_mandataire: 1,
        mandataire: 1,
      },
    }
  );

  return `${updated.nModified} formulaire mis à jour.`;
});
