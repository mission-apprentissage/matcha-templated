const { runScript } = require("../scriptWrapper");
const seedQuestionnaire = require("./seed");
const createUsers = require("./createUsers");

runScript(async ({ users, db }) => {
  await seedQuestionnaire(db, users);
  await createUsers(users);
});
