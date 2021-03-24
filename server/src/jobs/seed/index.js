const { runScript } = require("../scriptWrapper");
const createFormulaire = require("./createFormulaire");

runScript(async ({ formulaire }) => {
  await createFormulaire(formulaire);
});
