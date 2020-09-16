const assert = require("assert");
const httpTests = require("../../utils/httpTests");

httpTests(__filename, ({ startServer }) => {
  it("Vérifie que la route questionnaire fonctionne", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/questionnaire/items");

    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
  });
});
