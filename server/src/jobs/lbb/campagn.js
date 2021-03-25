const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const { asyncForEach } = require("../../common/utils/asyncUtils");

const launch = async (mail) => {
  const forms = Formulaire.find({});

  await asyncForEach(forms, async (form) => {
    const { raison_social, email, id_form } = form;
    const params = {
      RAISON_SOCIAL: raison_social,
      URL: `https://matcha.apprentissage.beta.gouv.fr/${id_form}`,
    };
    const body = {
      sender: {
        name: "Ministère du Travail, de l'Emploi et de l'Insertion",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      to: [
        {
          name: `${raison_social}`,
          email: `${email}`,
        },
      ],
      replyTo: {
        name: "Charlotte Lecuit",
        email: "charlotte.lecuit@beta.gouv.fr",
      },
      subject: `${raison_social}, le Ministère du Travail, de l'Emploi et de l'Insertion vous aide à exprimer vos besoins de recrutements`,
      templateId: 109,
      tags: ["matcha-lbb-202103"],
      params: params,
    };

    await mail.sendMail(body);
  });
};

runScript(async ({ mail }) => {
  await launch(mail);
});
