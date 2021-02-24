const { runScript } = require("../scriptWrapper");
const seedQuestionnaire = require("./seed");
const createUsers = require("./createUsers");
const removeUser = require("./removeUser");

runScript(async ({ users, db }) => {
  // await seedQuestionnaire(db, users);
  // await createUsers(users);
  await removeUser();
});
