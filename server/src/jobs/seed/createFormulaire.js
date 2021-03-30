const logger = require("../../common/logger");

module.exports = async (formulaire) => {
  const payload = {
    prenom: "Formulaire",
    nom: "Test",
    telephone: "0123456789",
    email: "adresse@mail.com",
    raison_social: "Ma société",
    siret: "12345678901234",
    geo_coordonnees: "2.385633,48.868565",
    adresse: "3 rue george duhamel, 75012, Paris",
    offres: [
      {
        niveau: "CAP, BEP",
        romes: ["A1203", "A1414"],
        libelle: "Paysagisme, entretien des jardins",
        description: "Détail",
      },
    ],
  };

  const user = await formulaire.createForm(payload);

  logger.info(`User ${user.prenom} created ! form_id : ${user.id_form}`);
};
