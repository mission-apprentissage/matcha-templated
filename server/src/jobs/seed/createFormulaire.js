const logger = require("../../common/logger");

module.exports = async (formulaire) => {
  const payload = {
    prenom: "John",
    nom: "Doe",
    telephone: "0746567686",
    email: "k.barnoin@gmail.com",
    raison_social: "BETA GOUV",
    siret: "12345678901234",
    adresse: "3 rue du liban, 75020, Paris",
  };

  const user = await formulaire.createForm(payload);

  logger.info(`User ${user.prenom} created ! form_id : ${user.id_form}`);
};
