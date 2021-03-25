const logger = require("../../common/logger");

module.exports = async (formulaire) => {
  const payload = {
    prenom: "Formulaire",
    nom: "Test",
    telephone: "0123456789",
    email: "adresse@mail.com",
    raison_social: "Ma société",
    siret: "12345678901234",
    adresse: "3 rue george duhamel, 75012, Paris",
  };

  const user = await formulaire.createForm(payload);

  logger.info(`User ${user.prenom} created ! form_id : ${user.id_form}`);
};
