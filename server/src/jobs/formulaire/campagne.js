/* eslint-disable */
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const logger = require("../../common/logger");
const { CLICKED } = require("../../common/components/mail.constant");
const { paginator } = require("../../common/utils/paginator");

const launch = async (mail) => {
  await paginator(
    Formulaire,
    { $nor: [{ offres: { $exists: false } }, { offres: { $size: 0 } }] },
    { lean: true },
    async (form) => {
      // const campagne = "matcha-lbb-20210420-avis-click-sans-offre";
      const campagne = "test";

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
            email: "k.barnoin@gmail.com",
            // email: `${email}`,
          },
        ],
        replyTo: {
          name: "Charlotte Lecuit",
          email: "charlotte.lecuit@beta.gouv.fr",
        },
        subject: `Vos offres d'apprentissage sur la bonnes alternance`,
        templateId: 179,
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

      if (!result.messageId) {
        logger.info(`error : ${message.code} —— ${message.message} — ${email}`);
      }

      await Formulaire.findByIdAndUpdate(_id, { $push: { mailing: message } });
    }
  );
};

runScript(async ({ mail }) => {
  await launch(mail);
});
