/* eslint-disable */
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const { asyncForEach } = require("../../common/utils/asyncUtils");
const logger = require("../../common/logger");

const launch = async (mail) => {
  const forms = await Formulaire.find({ $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }] }).lean();
  const campagne = "matcha-lbb-20210415-avis";

  // const campagne = "test";

  logger.info(`scope : ${forms.length} formulaires`);

  await asyncForEach(forms, async (form) => {
    const { raison_sociale, email, id_form, _id } = form;
    const params = {
      RAISON_SOCIALE: raison_sociale,
      URL: `https://matcha.apprentissage.beta.gouv.fr/${id_form}`,
    };
    const body = {
      sender: {
        name: "Mission interministérielle pour l'apprentissage",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      to: [
        {
          name: `${raison_sociale}`,
          // email: "k.barnoin@gmail.com",
          email: `${email}`,
        },
      ],
      replyTo: {
        name: "Charlotte Lecuit",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      // subject: `Relance: le gouvernement vous aide à recruter un apprenti`,
      templateId: 173,
      tags: [campagne],
      params: params,
    };

    const { body: result } = await mail.sendmail(body);
    const message = {
      campagne,
      code: result.code ?? null,
      message: result.message ?? null,
      messageId: result.messageId ?? null,
    };

    if (result.messageId) {
      logger.info(`email sent ${email}`);
    } else {
      logger.info(`error : ${message.code} —— ${message.message}`);
    }

    await Formulaire.findByIdAndUpdate(_id, { $push: { mailing: message } });
  });
};

runScript(async ({ mail }) => {
  await launch(mail);
});
