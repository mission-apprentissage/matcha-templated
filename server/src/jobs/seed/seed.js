const logger = require("../../common/logger");
const { Questionnaire } = require("../../common/model");

module.exports = async (db, users) => {
  const userCreated = await users.createUser("test", "name", "271985", "test@test.fr", "0600000000", "password");
  const recommandations = [
    {
      nom: "testR1",
      prenom: "testR1P",
      email: "test@test.fr",
      telephone: "0123458888",
      role: "test",
    },
    {
      nom: "testR2",
      prenom: "testR2P",
      email: "test@test2.fr",
      telephone: "022228888",
      role: "test2",
    },
  ];

  const activites = [
    {
      nom: "activiteTest1",
      periodicite: "periodiciteTest",
      criteres: ["critere1", "critere2"],
    },
    {
      nom: "activiteTest2",
      periodicite: "periodiciteTest2",
      criteres: ["critere3", "critere4"],
    },
  ];

  const experiences = [
    {
      nom: "experience1",
      taches: ["tache1", "tache2"],
      nom_entreprise: "entreprise",
      adresse_entreprise: "adresse entreprise",
      date_debut: new Date("11/20/2014 04:11"),
      date_fin: new Date("11/20/2015 04:11"),
    },
    {
      nom: "experience2",
      taches: ["tache2", "tache3"],
      nom_entreprise: "entreprise2",
      adresse_entreprise: "adresse entreprise2",
      date_debut: new Date("11/20/2016 04:11"),
      date_fin: new Date("11/20/2018 04:11"),
    },
  ];

  const voeux = [
    {
      code_voeux: "codeVoeux1",
      formation: "formation",
      choix: true,
    },
    {
      code_voeux: "codeVoeux2",
      formation: "formation2",
      choix: false,
    },
  ];

  const toAdd = new Questionnaire({
    user_id: userCreated._id,
    voeux: voeux,
    experiences: experiences,
    activites: activites,
    recommandations: recommandations,
  });
  await toAdd.save();
  logger.info(`Questionnaire '${toAdd.id}'  successfully added in db ${db.name}`);
};
