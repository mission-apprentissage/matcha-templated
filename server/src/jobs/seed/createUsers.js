const path = require("path");
const config = require("config");
const { writeFile } = require("fs").promises;
const logger = require("../../common/logger");
const { runScript } = require("../scriptWrapper");
const passwordGenerator = require("generate-password");
const { asyncForEach } = require("../../common/utils/asyncUtils");

const outputDir = config.outputDir;

const passwordOptions = {
  length: 12,
  numbers: true,
};

const users = [
  {
    username: "mna",
    password: passwordGenerator.generate(passwordOptions),
    email: "contact@matcha.apprentissage.beta.gouv.fr",
    isAdmin: true,
    scope: ["all"],
  },
  {
    username: "opco",
    password: passwordGenerator.generate(passwordOptions),
    email: "test@opco2i.com",
    isAdmin: true,
    scope: ["opco2i"],
  },
];

const prettify = (array) => JSON.stringify(array, null, 2);

const buildAdminsUsers = async (exportJsonFile = true) => {
  exportJsonFile && (await writeFile(path.join(outputDir, "usersMna.json"), prettify(users), "utf8"));
  return users;
};

const createUser = async (users) => {
  logger.info(`-- START - Seed Default Users --`);

  const userList = await buildAdminsUsers();

  // Users creation
  await asyncForEach(userList, async ({ username, password, email, isAdmin, scope }) => {
    try {
      let exist = await users.getUser(email);
      if (exist) return;

      await users.createUser(username, password, email, isAdmin, scope);
    } catch (e) {
      logger.error(e);
    }
  });

  logger.info("-- END - Seed Default Users --");
};

runScript(async ({ users }) => {
  await createUser(users);
});
