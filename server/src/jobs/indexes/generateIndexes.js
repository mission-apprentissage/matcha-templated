const { Formulaire, User } = require("../../common/model");
const { rebuildIndex } = require("../../common/utils/esUtils");

const generateIndexes = async () => {
  await Formulaire.syncIndexes();
  await User.syncIndexes();
  await rebuildIndex("formulaires", Formulaire);
};

module.exports = { generateIndexes };
