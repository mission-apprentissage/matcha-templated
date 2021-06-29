const { Formulaire } = require("../../common/model");
const { asyncForEach } = require("../../common/utils/asyncUtils");
const moment = require("moment");
const { runScript } = require("../scriptWrapper");

const logger = require("../../common/logger");

const transactionalReports = async (mail) => {
  // number of days to expiration for the reminder email to be sent
  let threshold = 7;

  const forms = await Formulaire.find({
    "offres.statut": "Active",
    "offres.relance_mail_sent": false,
    $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }],
  }).lean();

  // reduce formulaire with eligible offers
  const format = forms.reduce((acc, formulaire) => {
    acc[formulaire._id] = { ...formulaire, offres: [] };

    formulaire.offres
      .filter((x) => x.relance_mail_sent === false)
      .forEach((offre) => {
        let remainingDays = moment(offre.date_expiration).diff(moment(), "day");

        // if the current date is not equal or above the trigger date, do nothing
        if (remainingDays > threshold) return;

        acc[formulaire._id].offres.push(offre);
      });
    return acc;
  }, {});

  // format array and remove formulaire without offers
  const formulaireToExpire = Object.values(format).filter((x) => x.offres.length !== 0);

  if (formulaireToExpire.length === 0) return;

  const nbOffres = formulaireToExpire.reduce((acc, formulaire) => (acc += formulaire.offres.length), 0);

  logger.info(`${nbOffres} offres à relancer (${formulaireToExpire.length} formulaires)`);

  await asyncForEach(formulaireToExpire, async (formulaire) => {
    let { email, raison_sociale, id_form, _id } = formulaire;

    // Send mail with action links to manage offers
    const mailBody = {
      subject: "Vos offres vont expirer prochainement",
      email,
      raison_sociale,
      id_form,
      templateId: 182,
      tags: ["matcha-relance-expiration"],
    };

    const payload = mail.getEmailBody(mailBody);

    const { body: result } = await mail.sendmail(payload);

    const message = {
      campagne: "matcha-relance-expiration",
      code: result.code ?? null,
      message: result.message ?? null,
      messageId: result.messageId ?? null,
    };

    if (!result.messageId) {
      logger.info(`error : ${message.code} —— ${message.message} — ${email}`);
      return;
    }

    await Formulaire.findByIdAndUpdate(_id, { $push: { mailing: message } });

    await asyncForEach(formulaire.offres, async (offre) => {
      // update record using MongoDB API to avoid timestamp automatic update
      await Formulaire.collection.update({ "offres._id": offre._id }, { $set: { "offres.$.relance_mail_sent": true } });
      console.log("coucou", offre._id);
    });
  });
};

module.exports = { transactionalReports };

runScript(async ({ mail }) => await transactionalReports(mail));
