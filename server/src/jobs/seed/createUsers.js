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

const mnaUsers = [
  {
    username: "mna",
    password: passwordGenerator.generate(passwordOptions),
    writeable: true,
    isAdmin: true,
  },
];

const prettify = (array) => JSON.stringify(array, null, 2);

const buildAdminsUsers = async (exportJsonFile = true) => {
  exportJsonFile && (await writeFile(path.join(outputDir, "usersMna.json"), prettify(mnaUsers), "utf8"));
  return mnaUsers;
};

const createUser = async (users) => {
  logger.info(`-- START - Seed Default Users --`);

  const defaultUsersToCreate = await buildAdminsUsers();

  // Users creation
  await asyncForEach(defaultUsersToCreate, async ({ username, password, writeable, isAdmin }) => {
    try {
      let permissions = { writeable, isAdmin };
      await users.createAdmin(username, password, { permissions });
    } catch (e) {
      logger.error(e);
    }
  });

  logger.info("-- END - Seed Default Users --");
};

runScript(async ({ users }) => {
  await createUser(users);
});
