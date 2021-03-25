/* eslint-disable */
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const { asyncForEach } = require("../../common/utils/asyncUtils");
const logger = require("../../common/logger");

const launch = async (mail) => {
  const forms = await Formulaire.find({}).lean();
  const campagne = "TEST";

  await asyncForEach(forms, async (form) => {
    const { raison_social, email, id_form, _id } = form;
    const params = {
      RAISON_SOCIAL: raison_social,
      URL: `https://matcha.apprentissage.beta.gouv.fr/${id_form}`,
    };
    const body = {
      sender: {
        name: "Ministère du Travail de l'Emploi et de l'Insertion",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      to: [
        {
          name: `${raison_social}`,
          // email: `${email}`,
          email: "k.barnoin@gmail.com",
        },
      ],
      replyTo: {
        name: "Charlotte Lecuit",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      subject: `${raison_social}, le Ministère du Travail, de l'Emploi et de l'Insertion vous aide à exprimer vos besoins de recrutements`,
      templateId: 159,
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
      logger.info(`error : ${code} —— ${message}`);
    }

    await Formulaire.findByIdAndUpdate(_id, { $push: { mailing: message } });
  });
};

runScript(async ({ mail }) => {
  await launch(mail);
});
