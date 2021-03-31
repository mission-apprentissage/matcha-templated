const logger = require("../../common/logger");

module.exports = async (formulaire) => {
  const payload = {
    prenom: "Formulaire",
    nom: "Test",
    telephone: "0123456789",
    email: "adresse@mail.com",
    raison_sociale: "Ma société",
    siret: "12345678901234",
    geo_coordonnees: "42.6170836,3.0011665",
    adresse: "3 Rue Georges Duhamel, 66750 Saint-Cyprien, France",
    offres: [
      {
        niveau: "CAP, BEP",
        romes: ["A1203", "A1414"],
        libelle: "Paysagisme, entretien des jardins",
        description: "Détail",
      },
      {
        niveau: "BAC",
        romes: ["A3465", "A9876"],
        libelle: "Informatique",
        description: "Détail",
      },
    ],
  };

  const user = await formulaire.createForm(payload);

  logger.info(`User ${user.prenom} created ! form_id : ${user.id_form}`);
};
