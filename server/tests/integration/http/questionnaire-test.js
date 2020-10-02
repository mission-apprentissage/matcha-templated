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
      questionnaire_id: "5f6206373f9a6f10488dd151",
      candidat: {
        prenom: "Test",
        nom: "Test",
        telephone: "0612345678",
        email: "test@mna.test",
        dateNaissance: "2020-1-10",
      },
      voeux: [
        {
          code_voeux: "testCode",
          etablissement: "testEtablissement",
          metier: "testMetier",
          niveau: "testNiveau",
          formation: "testFormation",
          choix: true,
        },
        {
          code_voeux: "testCode2",
          etablissement: "testEtablissement2",
          metier: "testMetier2",
          niveau: "testNiveau2",
          formation: "testFormation2",
          choix: true,
        },
      ],
      mobilite: {
        commune: "testCommune",
        permis: true,
        distance: {
          label: "testDistance",
          code: 3,
        },
      },
      experiences: [
        {
          nom: "experience1",
          taches: ["tache1", "tache2"],
          nomEntreprise: "entreprise",
          adresseEntreprise: "adresse entreprise",
          dateDebut: Date.now,
          dateFin: Date.now,
        },
        {
          nom: "experience2",
          taches: ["tache1", "tache2"],
          nomEntreprise: "entreprise2",
          adresseEntreprise: "adresse entreprise2",
          dateDebut: Date.now,
          dateFin: Date.now,
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

    const fakeId = "999bf1d7-a378-4b3f-a35c-1277304cfa1c";
    const response = await httpClient.post("/api/questionnaire/items/999bf1d7-a378-4b3f-a35c-1277304cfa1c", dataToAdd);
    assert.strictEqual(response.status, 200);
    assert.ok(response.data._id);

    const found = await Questionnaire.findById(response.data._id);
    assert.notDeepStrictEqual(found, null);
    // TODO Suite
  });
});
