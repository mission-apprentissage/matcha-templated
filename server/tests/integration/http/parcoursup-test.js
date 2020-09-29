const assert = require("assert");
const httpTests = require("../../utils/httpTests");
const users = require("../../../src/common/components/users");

httpTests(__filename, ({ startServer }) => {
  it("Vérifie que la route parcoursup fonctionne", async () => {
    const { httpClient } = await startServer();
    const { createUser } = await users();

    await createUser("user", "name", "271985", "user@test.fr", "0600000000", "password");
    const response = await httpClient.get("/api/parcoursup/items/271985");

    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    // TODO Suite
  });
});
