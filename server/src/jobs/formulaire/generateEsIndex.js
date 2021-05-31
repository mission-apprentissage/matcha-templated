const { Formulaire, User } = require("../../common/model");
const { runScript } = require("../scriptWrapper");
const { rebuildIndex } = require("../../common/utils/esUtils");

runScript(async () => {
  await Formulaire.syncIndexes();
  await User.syncIndexes();
  await rebuildIndex("formulaires", Formulaire);
});
