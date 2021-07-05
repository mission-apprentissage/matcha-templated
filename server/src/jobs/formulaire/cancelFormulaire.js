const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const moment = require("moment");
const { asyncForEach } = require("../../common/utils/asyncUtils");

const cancelFormulaire = async () => {
  const today = moment().add(3, "days").startOf("day").utc(true);

  const formulaires = await Formulaire.find({
    "offres.statut": "Active",
    "offres.date_expiration": { $lte: today },
    "offres.relance_mail_sent": true,
  }).lean();

  // reduce formulaire with eligible offers
  const offersToCancel = formulaires.reduce((acc, formulaire) => {
    formulaire.offres
      .filter((x) => x.relance_mail_sent === true)
      .forEach((offre) => {
        // if the expiration date is not equal or above today's date, do nothing
        if (!moment(offre.date_expiration).isSameOrBefore(today)) return;

        acc.push(offre);
      });
    return acc;
  }, []);

  console.log(offersToCancel.length, formulaires.length);
  if (offersToCancel.length === 0) return;

  const stats = {
    offersToCancel: offersToCancel.length,
    totalCanceled: 0,
  };

  await asyncForEach(offersToCancel, async (offre) => {
    await Formulaire.findOneAndUpdate({ "offres._id": offre._id }, { $set: { "offres.$.statut": "Annulée" } });
    stats.totalCanceled += 1;
  });

  return stats;
};

module.exports = { cancelFormulaire };

runScript(async () => await cancelFormulaire());
