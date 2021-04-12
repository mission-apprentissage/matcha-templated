/* eslint-disable */
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const { asyncForEach } = require("../../common/utils/asyncUtils");
const logger = require("../../common/logger");

const launch_2 = async (mail) => {
  const forms = await Formulaire.find({ "events.event": "opened", "events.tag": "matcha-lbb-20210331" }).lean();
  const campagne = "matcha-lbb-20210412-relance-ouvert-non-click";

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
          email: `${email}`,
        },
      ],
      replyTo: {
        name: "Charlotte Lecuit",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      subject: `Relance: le gouvernement vous aide à recruter un apprenti`,
      templateId: 171,
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

const launch = async (mail) => {
  const forms = await Formulaire.find({ "events.event": "delivered", "events.tag": "matcha-lbb-20210331" }).lean();
  const campagne = "matcha-lbb-20210412-relance-non-ouvert";

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
          email: `${email}`,
        },
      ],
      replyTo: {
        name: "Charlotte Lecuit",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      subject: `Relance: le gouvernement vous aide à recruter un apprenti`,
      templateId: 170,
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
  await launch_2(mail);
});
