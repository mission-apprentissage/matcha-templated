const assert = require("assert");
const integrationTests = require("../../utils/integrationTests");
const users = require("../../../src/common/components/users");
const { User } = require("../../../src/common/model");

integrationTests(__filename, () => {
  it("Permet de créer un utilisateur", async () => {
    const { createUser } = await users();

    const created = await createUser("user", "name", "123", "user@test.fr", "0600000000", "password");
    assert.strictEqual(created.nom, "user");
    assert.strictEqual(created.prenom, "name");
    assert.strictEqual(created.username, "user@test.fr");
    assert.strictEqual(created.isAdmin, false);
    assert.strictEqual(created.parcoursup_id, "123");
    assert.strictEqual(created.email, "user@test.fr");
    assert.strictEqual(created.telephone, "0600000000");
    assert.strictEqual(created.password.startsWith("$6$rounds=1001"), true);

    const found = await User.findOne({ username: "user@test.fr" });
    assert.strictEqual(found.nom, "user");
    assert.strictEqual(found.prenom, "name");
    assert.strictEqual(found.username, "user@test.fr");
    assert.strictEqual(found.isAdmin, false);
    assert.strictEqual(found.parcoursup_id, "123");
    assert.strictEqual(found.email, "user@test.fr");
    assert.strictEqual(found.telephone, "0600000000");
    assert.strictEqual(found.password.startsWith("$6$rounds=1001"), true);
  });

  it("Permet de créer un utilisateur avec les droits d'admin", async () => {
    const { createUser } = await users();

    const user = await createUser("userAdmin", "name", "123", "user@test.fr", "0600000000", "password", {
      permissions: { isAdmin: true },
    });
    const found = await User.findOne({ username: "user@test.fr" });

    assert.strictEqual(user.isAdmin, true);
    assert.strictEqual(found.isAdmin, true);
  });

  it("Permet de supprimer un utilisateur", async () => {
    const { createUser, removeUser } = await users();

    await createUser("userToDelete", "name", "123", "user@test.fr", "0600000000", "password", {
      permissions: { isAdmin: true },
    });
    await removeUser("user@test.fr");

    const found = await User.findOne({ username: "user@test.fr" });
    assert.strictEqual(found, null);
  });

  it("Vérifie que le mot de passe est valide", async () => {
    const { createUser, authenticate } = await users();

    await createUser("user", "name", "123", "user@test.fr", "0600000000", "password");
    const user = await authenticate("user@test.fr", "password");

    assert.strictEqual(user.username, "user@test.fr");
  });

  it("Vérifie que le mot de passe est invalide", async () => {
    const { createUser, authenticate } = await users();

    await createUser("user", "name", "123", "user@test.fr", "0600000000", "password");
    const user = await authenticate("user@test.fr", "INVALID");

    assert.strictEqual(user, null);
  });

  it("Vérifie qu'on peut changer le mot de passe d'un utilisateur", async () => {
    const { createUser, authenticate, changePassword } = await users();

    await createUser("user", "name", "123", "user@test.fr", "0600000000", "password");
    await changePassword("user@test.fr", "newPassword");
    const user = await authenticate("user@test.fr", "newPassword");

    assert.strictEqual(user.username, "user@test.fr");
  });
});
