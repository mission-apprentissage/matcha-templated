const assert = require("assert");
const httpTests = require("../../utils/httpTests");
const { Questionnaire } = require("../../../src/common/model");

httpTests(__filename, ({ startServer }) => {
  it("Vérifie que la route questionnaire fonctionne", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/questionnaire/items");

    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
  });

  it("Vérifie que l'ajout questionnaire fonctionne", async () => {
    const { httpClient } = await startServer();
    await Questionnaire.deleteMany({});

    const dataToAdd = {
      user_id: "5f6206373f9a6f10488dd151",
      voeux: [
        {
          code_voeux: "testCode",
          formation: "testFormation",
          choix: true,
        },
        {
          code_voeux: "codeVoeux2",
          formation: "formation2",
          choix: false,
        },
      ],
      experiences: [
        {
          nom: "experience1",
          taches: ["tache1", "tache2"],
          nom_entreprise: "entreprise",
          adresse_entreprise: "adresse entreprise",
          date_debut: Date.now,
          date_fin: Date.now,
        },
        {
          nom: "experience2",
          taches: ["tache2", "tache3"],
          nom_entreprise: "entreprise2",
          adresse_entreprise: "adresse entreprise2",
          date_debut: Date.now,
          date_fin: Date.now,
        },
      ],
      activites: [
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
      ],
      recommandations: [
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
      ],
    };

    const response = await httpClient.post("/api/questionnaire/items", dataToAdd);
    assert.strictEqual(response.status, 200);
    assert.ok(response.data._id);

    const found = await Questionnaire.findById(response.data._id);
    assert.notDeepStrictEqual(found, null);
    // TODO Suite
  });
});
