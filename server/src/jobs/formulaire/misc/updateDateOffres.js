const { Formulaire } = require("../../../common/model");
const { asyncForEach } = require("../../../common/utils/asyncUtils");
const { paginator } = require("../../../common/utils/paginator");
const { runScript } = require("../../scriptWrapper");

runScript(async () => {
  await paginator(Formulaire, {}, { lean: true }, async (formulaire) => {
    let offres = [];

    await asyncForEach(formulaire.offres, async (offre) => {
      offres.push({
        ...offre,
        date_debut_apprentissage: new Date("2021-09-06"),
        date_creation: new Date("2021-06-01"),
        date_expiration: new Date("2021-07-01"),
        statut: "Active",
      });
    });

    formulaire.origine = "lbb";
    formulaire.offres = offres;

    await Formulaire.findByIdAndUpdate(formulaire._id, formulaire);
  });
});
